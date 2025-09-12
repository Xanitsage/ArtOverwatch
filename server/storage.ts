import { 
  type Entity, type InsertEntity,
  type Account, type InsertAccount,
  type Transaction, type InsertTransaction,
  type Invoice, type InsertInvoice,
  type Stakeholder, type InsertStakeholder,
  type CreativeSession, type InsertCreativeSession,
  type Goal, type InsertGoal,
  type Streak, type InsertStreak
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Entities
  getEntities(): Promise<Entity[]>;
  getEntity(id: string): Promise<Entity | undefined>;
  createEntity(entity: InsertEntity): Promise<Entity>;
  updateEntity(id: string, entity: Partial<InsertEntity>): Promise<Entity | undefined>;
  
  // Accounts
  getAccounts(entityId?: string): Promise<Account[]>;
  getAccount(id: string): Promise<Account | undefined>;
  createAccount(account: InsertAccount): Promise<Account>;
  updateAccount(id: string, account: Partial<InsertAccount>): Promise<Account | undefined>;
  
  // Transactions
  getTransactions(accountId?: string, limit?: number): Promise<Transaction[]>;
  getTransaction(id: string): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Invoices
  getInvoices(entityId?: string): Promise<Invoice[]>;
  getInvoice(id: string): Promise<Invoice | undefined>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: string, invoice: Partial<InsertInvoice>): Promise<Invoice | undefined>;
  
  // Stakeholders
  getStakeholders(): Promise<Stakeholder[]>;
  getStakeholder(id: string): Promise<Stakeholder | undefined>;
  createStakeholder(stakeholder: InsertStakeholder): Promise<Stakeholder>;
  updateStakeholder(id: string, stakeholder: Partial<InsertStakeholder>): Promise<Stakeholder | undefined>;
  
  // Creative Sessions
  getCreativeSessions(entityId?: string, limit?: number): Promise<CreativeSession[]>;
  getCreativeSession(id: string): Promise<CreativeSession | undefined>;
  createCreativeSession(session: InsertCreativeSession): Promise<CreativeSession>;
  updateCreativeSession(id: string, session: Partial<InsertCreativeSession>): Promise<CreativeSession | undefined>;
  
  // Goals
  getGoals(entityId?: string): Promise<Goal[]>;
  getGoal(id: string): Promise<Goal | undefined>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoal(id: string, goal: Partial<InsertGoal>): Promise<Goal | undefined>;
  
  // Streaks
  getStreaks(entityId?: string): Promise<Streak[]>;
  getStreak(id: string): Promise<Streak | undefined>;
  createStreak(streak: InsertStreak): Promise<Streak>;
  updateStreak(id: string, streak: Partial<InsertStreak>): Promise<Streak | undefined>;
}

export class MemStorage implements IStorage {
  private entities: Map<string, Entity> = new Map();
  private accounts: Map<string, Account> = new Map();
  private transactions: Map<string, Transaction> = new Map();
  private invoices: Map<string, Invoice> = new Map();
  private stakeholders: Map<string, Stakeholder> = new Map();
  private creativeSessions: Map<string, CreativeSession> = new Map();
  private goals: Map<string, Goal> = new Map();
  private streaks: Map<string, Streak> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed default entities
    const defaultEntities = [
      { name: "RENE", displayName: "RENE Creative", description: "Creative development entity", color: "#10B981" },
      { name: "YUKI", displayName: "YUKI Business", description: "Business operations entity", color: "#3B82F6" },
      { name: "JAMES", displayName: "JAMES Strategy", description: "Strategic planning entity", color: "#8B5CF6" },
      { name: "TREASURY", displayName: "Treasury", description: "Financial management entity", color: "#EF4444" },
    ];
    
    defaultEntities.forEach(entity => {
      const id = randomUUID();
      this.entities.set(id, { 
        ...entity, 
        id, 
        createdAt: new Date(),
        description: entity.description || null
      });
    });
    
    // Seed stakeholders
    const defaultStakeholders = [
      { name: "Community Members", email: "community@artoverwatch.co.za", type: "community", ownershipPercentage: "60.00", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=32&h=32&fit=crop&crop=face" },
      { name: "Creative Label", email: "label@artoverwatch.co.za", type: "investor", ownershipPercentage: "10.00", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=32&h=32&fit=crop&crop=face" },
      { name: "Henry Hawkins", email: "henry@artoverwatch.co.za", type: "founder", ownershipPercentage: "15.00", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" },
      { name: "Lara Collins", email: "lara@artoverwatch.co.za", type: "founder", ownershipPercentage: "15.00", avatar: "https://images.unsplash.com/photo-1494790108755-2616b89ddc4d?w=32&h=32&fit=crop&crop=face" },
    ];
    
    defaultStakeholders.forEach(stakeholder => {
      const id = randomUUID();
      this.stakeholders.set(id, { 
        ...stakeholder, 
        id, 
        joinDate: new Date(), 
        isActive: true, 
        bio: null,
        email: stakeholder.email || null,
        avatar: stakeholder.avatar || null
      });
    });
  }

  // Entities
  async getEntities(): Promise<Entity[]> {
    return Array.from(this.entities.values());
  }

  async getEntity(id: string): Promise<Entity | undefined> {
    return this.entities.get(id);
  }

  async createEntity(insertEntity: InsertEntity): Promise<Entity> {
    const id = randomUUID();
    const entity: Entity = { 
      ...insertEntity, 
      id, 
      createdAt: new Date(),
      description: insertEntity.description || null
    };
    this.entities.set(id, entity);
    return entity;
  }

  async updateEntity(id: string, updateEntity: Partial<InsertEntity>): Promise<Entity | undefined> {
    const existing = this.entities.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updateEntity };
    this.entities.set(id, updated);
    return updated;
  }

  // Accounts
  async getAccounts(entityId?: string): Promise<Account[]> {
    const accounts = Array.from(this.accounts.values());
    return entityId ? accounts.filter(a => a.entityId === entityId) : accounts;
  }

  async getAccount(id: string): Promise<Account | undefined> {
    return this.accounts.get(id);
  }

  async createAccount(insertAccount: InsertAccount): Promise<Account> {
    const id = randomUUID();
    const account: Account = { 
      ...insertAccount, 
      id, 
      createdAt: new Date(),
      description: insertAccount.description || null,
      entityId: insertAccount.entityId || null,
      currency: insertAccount.currency || "ZAR",
      balance: insertAccount.balance || "0.00",
      isActive: insertAccount.isActive !== undefined ? insertAccount.isActive : true
    };
    this.accounts.set(id, account);
    return account;
  }

  async updateAccount(id: string, updateAccount: Partial<InsertAccount>): Promise<Account | undefined> {
    const existing = this.accounts.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updateAccount };
    this.accounts.set(id, updated);
    return updated;
  }

  // Transactions
  async getTransactions(accountId?: string, limit = 50): Promise<Transaction[]> {
    let transactions = Array.from(this.transactions.values())
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    
    if (accountId) {
      transactions = transactions.filter(t => t.fromAccountId === accountId || t.toAccountId === accountId);
    }
    
    return transactions.slice(0, limit);
  }

  async getTransaction(id: string): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = { 
      ...insertTransaction, 
      id, 
      createdAt: new Date(),
      description: insertTransaction.description || null,
      fromAccountId: insertTransaction.fromAccountId || null,
      toAccountId: insertTransaction.toAccountId || null,
      reference: insertTransaction.reference || null,
      currency: insertTransaction.currency || "ZAR",
      status: insertTransaction.status || "completed",
      metadata: insertTransaction.metadata || null
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  // Invoices
  async getInvoices(entityId?: string): Promise<Invoice[]> {
    const invoices = Array.from(this.invoices.values());
    return entityId ? invoices.filter(i => i.entityId === entityId) : invoices;
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    return this.invoices.get(id);
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const id = randomUUID();
    const invoice: Invoice = { 
      ...insertInvoice, 
      id, 
      createdAt: new Date(),
      description: insertInvoice.description || null,
      entityId: insertInvoice.entityId || null,
      clientEmail: insertInvoice.clientEmail || null,
      currency: insertInvoice.currency || "ZAR",
      vatAmount: insertInvoice.vatAmount || "0.00",
      includeVat: insertInvoice.includeVat !== undefined ? insertInvoice.includeVat : true,
      status: insertInvoice.status || "draft",
      dueDate: insertInvoice.dueDate || null,
      paidAt: insertInvoice.paidAt || null
    };
    this.invoices.set(id, invoice);
    return invoice;
  }

  async updateInvoice(id: string, updateInvoice: Partial<InsertInvoice>): Promise<Invoice | undefined> {
    const existing = this.invoices.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updateInvoice };
    this.invoices.set(id, updated);
    return updated;
  }

  // Stakeholders
  async getStakeholders(): Promise<Stakeholder[]> {
    return Array.from(this.stakeholders.values());
  }

  async getStakeholder(id: string): Promise<Stakeholder | undefined> {
    return this.stakeholders.get(id);
  }

  async createStakeholder(insertStakeholder: InsertStakeholder): Promise<Stakeholder> {
    const id = randomUUID();
    const stakeholder: Stakeholder = { 
      ...insertStakeholder, 
      id, 
      joinDate: new Date(),
      email: insertStakeholder.email || null,
      ownershipPercentage: insertStakeholder.ownershipPercentage || "0.00",
      isActive: insertStakeholder.isActive !== undefined ? insertStakeholder.isActive : true,
      avatar: insertStakeholder.avatar || null,
      bio: insertStakeholder.bio || null
    };
    this.stakeholders.set(id, stakeholder);
    return stakeholder;
  }

  async updateStakeholder(id: string, updateStakeholder: Partial<InsertStakeholder>): Promise<Stakeholder | undefined> {
    const existing = this.stakeholders.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updateStakeholder };
    this.stakeholders.set(id, updated);
    return updated;
  }

  // Creative Sessions
  async getCreativeSessions(entityId?: string, limit = 50): Promise<CreativeSession[]> {
    let sessions = Array.from(this.creativeSessions.values())
      .sort((a, b) => new Date(b.startedAt!).getTime() - new Date(a.startedAt!).getTime());
    
    if (entityId) {
      sessions = sessions.filter(s => s.entityId === entityId);
    }
    
    return sessions.slice(0, limit);
  }

  async getCreativeSession(id: string): Promise<CreativeSession | undefined> {
    return this.creativeSessions.get(id);
  }

  async createCreativeSession(insertSession: InsertCreativeSession): Promise<CreativeSession> {
    const id = randomUUID();
    const session: CreativeSession = { 
      ...insertSession, 
      id, 
      startedAt: new Date(),
      entityId: insertSession.entityId || null,
      output: insertSession.output || null,
      mood: insertSession.mood || null,
      intensity: insertSession.intensity || "medium",
      completedAt: insertSession.completedAt || null
    };
    this.creativeSessions.set(id, session);
    return session;
  }

  async updateCreativeSession(id: string, updateSession: Partial<InsertCreativeSession>): Promise<CreativeSession | undefined> {
    const existing = this.creativeSessions.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updateSession };
    this.creativeSessions.set(id, updated);
    return updated;
  }

  // Goals
  async getGoals(entityId?: string): Promise<Goal[]> {
    const goals = Array.from(this.goals.values());
    return entityId ? goals.filter(g => g.entityId === entityId) : goals;
  }

  async getGoal(id: string): Promise<Goal | undefined> {
    return this.goals.get(id);
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const id = randomUUID();
    const goal: Goal = { 
      ...insertGoal, 
      id, 
      startDate: new Date(),
      entityId: insertGoal.entityId || null,
      current: insertGoal.current || 0,
      period: insertGoal.period || "daily",
      endDate: insertGoal.endDate || null,
      isActive: insertGoal.isActive !== undefined ? insertGoal.isActive : true
    };
    this.goals.set(id, goal);
    return goal;
  }

  async updateGoal(id: string, updateGoal: Partial<InsertGoal>): Promise<Goal | undefined> {
    const existing = this.goals.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updateGoal };
    this.goals.set(id, updated);
    return updated;
  }

  // Streaks
  async getStreaks(entityId?: string): Promise<Streak[]> {
    const streaks = Array.from(this.streaks.values());
    return entityId ? streaks.filter(s => s.entityId === entityId) : streaks;
  }

  async getStreak(id: string): Promise<Streak | undefined> {
    return this.streaks.get(id);
  }

  async createStreak(insertStreak: InsertStreak): Promise<Streak> {
    const id = randomUUID();
    const streak: Streak = { 
      ...insertStreak, 
      id,
      entityId: insertStreak.entityId || null,
      currentStreak: insertStreak.currentStreak || 0,
      longestStreak: insertStreak.longestStreak || 0,
      lastActivityDate: insertStreak.lastActivityDate || null,
      isActive: insertStreak.isActive !== undefined ? insertStreak.isActive : true
    };
    this.streaks.set(id, streak);
    return streak;
  }

  async updateStreak(id: string, updateStreak: Partial<InsertStreak>): Promise<Streak | undefined> {
    const existing = this.streaks.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updateStreak };
    this.streaks.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
