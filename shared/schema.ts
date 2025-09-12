import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Core ArtOverwatch Entities
export const entities = pgTable("entities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // RENE, YUKI, JAMES, TREASURY
  displayName: text("display_name").notNull(),
  description: text("description"),
  color: text("color").notNull().default("#3B82F6"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Revenue accounts and wallets
export const accounts = pgTable("accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  entityId: varchar("entity_id").references(() => entities.id),
  name: text("name").notNull(), // Commercial, Grants, Merch, Royalties
  type: text("type").notNull(), // revenue_stream, operating_account, savings
  currency: text("currency").notNull().default("ZAR"),
  balance: decimal("balance", { precision: 12, scale: 2 }).notNull().default("0.00"),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Financial transactions and transfers
export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fromAccountId: varchar("from_account_id").references(() => accounts.id),
  toAccountId: varchar("to_account_id").references(() => accounts.id),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("ZAR"),
  type: text("type").notNull(), // transfer, payment, allocation, fee
  reference: text("reference"),
  description: text("description"),
  metadata: jsonb("metadata"), // Additional transaction details
  status: text("status").notNull().default("completed"), // pending, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
});

// Client invoices and payments
export const invoices = pgTable("invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  entityId: varchar("entity_id").references(() => entities.id),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email"),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("ZAR"),
  vatAmount: decimal("vat_amount", { precision: 12, scale: 2 }).default("0.00"),
  includeVat: boolean("include_vat").notNull().default(true),
  description: text("description"),
  status: text("status").notNull().default("draft"), // draft, sent, paid, overdue
  dueDate: timestamp("due_date"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Stakeholders and community members
export const stakeholders = pgTable("stakeholders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").unique(),
  type: text("type").notNull(), // community, investor, founder, advisor
  ownershipPercentage: decimal("ownership_percentage", { precision: 5, scale: 2 }).default("0.00"),
  joinDate: timestamp("join_date").defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
  avatar: text("avatar"),
  bio: text("bio"),
});

// Creative sessions and tracking
export const creativeSessions = pgTable("creative_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  entityId: varchar("entity_id").references(() => entities.id),
  title: text("title"),
  type: text("type").notNull(), // painting, digital_art, client_work, etc.
  discipline: text("discipline"), // music, visual, writing, business (legacy)
  duration: integer("duration").notNull().default(0), // minutes
  output: text("output"), // Description of what was created
  mood: text("mood"), // creative, business, wellness
  intensity: text("intensity").default("medium"), // low, medium, high
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Goals and targets
export const goals = pgTable("goals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  entityId: varchar("entity_id").references(() => entities.id),
  type: text("type").notNull(), // daily_create, daily_business, daily_wellness, weekly_revenue
  category: text("category").notNull().default("creative"), // creative, business, wellness
  target: integer("target").notNull(), // Target value (minutes, amount, count)
  current: integer("current").notNull().default(0),
  period: text("period").notNull().default("daily"), // daily, weekly, monthly
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  isActive: boolean("is_active").notNull().default(true),
});

// Streaks and achievements
export const streaks = pgTable("streaks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  entityId: varchar("entity_id").references(() => entities.id),
  type: text("type").notNull(), // create, business, wellness
  category: text("category").default("creative"), // creative, business, wellness
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  lastActivityDate: timestamp("last_activity_date"),
  isActive: boolean("is_active").notNull().default(true),
});

// Schema exports with Zod validation
export const insertEntitySchema = createInsertSchema(entities).omit({ id: true, createdAt: true });
export const insertAccountSchema = createInsertSchema(accounts).omit({ id: true, createdAt: true });
export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true, createdAt: true });
export const insertInvoiceSchema = createInsertSchema(invoices).omit({ id: true, createdAt: true });
export const insertStakeholderSchema = createInsertSchema(stakeholders).omit({ id: true, joinDate: true });
export const insertCreativeSessionSchema = createInsertSchema(creativeSessions).omit({ id: true, startedAt: true });
export const insertGoalSchema = createInsertSchema(goals).omit({ id: true, startDate: true });
export const insertStreakSchema = createInsertSchema(streaks).omit({ id: true });

// Type exports
export type Entity = typeof entities.$inferSelect;
export type InsertEntity = z.infer<typeof insertEntitySchema>;
export type Account = typeof accounts.$inferSelect;
export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Stakeholder = typeof stakeholders.$inferSelect;
export type InsertStakeholder = z.infer<typeof insertStakeholderSchema>;
export type CreativeSession = typeof creativeSessions.$inferSelect;
export type InsertCreativeSession = z.infer<typeof insertCreativeSessionSchema>;
export type Goal = typeof goals.$inferSelect;
export type InsertGoal = z.infer<typeof insertGoalSchema>;
export type Streak = typeof streaks.$inferSelect;
export type InsertStreak = z.infer<typeof insertStreakSchema>;
