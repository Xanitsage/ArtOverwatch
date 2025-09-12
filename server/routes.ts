import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { 
  insertEntitySchema, insertAccountSchema, insertTransactionSchema,
  insertInvoiceSchema, insertStakeholderSchema, insertCreativeSessionSchema,
  insertGoalSchema, insertStreakSchema
} from "@shared/schema";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api", async (req, res) => {
    try {
      res.json({ message: "ArtOverwatch API is working", version: "1.0.0" });
    } catch (error) {
      console.error("Health check error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Entities routes
  app.get("/api/entities", async (req, res) => {
    try {
      const entities = await storage.getEntities();
      res.json(entities);
    } catch (error) {
      console.error("Get entities error:", error);
      res.status(500).json({ error: "Failed to fetch entities" });
    }
  });

  app.get("/api/entities/:id", async (req, res) => {
    try {
      const entity = await storage.getEntity(req.params.id);
      if (!entity) {
        return res.status(404).json({ error: "Entity not found" });
      }
      res.json(entity);
    } catch (error) {
      console.error("Get entity error:", error);
      res.status(500).json({ error: "Failed to fetch entity" });
    }
  });

  app.post("/api/entities", async (req, res) => {
    try {
      const validated = insertEntitySchema.parse(req.body);
      const entity = await storage.createEntity(validated);
      res.status(201).json(entity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Create entity error:", error);
      res.status(500).json({ error: "Failed to create entity" });
    }
  });

  // Accounts routes
  app.get("/api/accounts", async (req, res) => {
    try {
      const entityId = req.query.entityId as string;
      const accounts = await storage.getAccounts(entityId);
      res.json(accounts);
    } catch (error) {
      console.error("Get accounts error:", error);
      res.status(500).json({ error: "Failed to fetch accounts" });
    }
  });

  app.post("/api/accounts", async (req, res) => {
    try {
      const validated = insertAccountSchema.parse(req.body);
      const account = await storage.createAccount(validated);
      res.status(201).json(account);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Create account error:", error);
      res.status(500).json({ error: "Failed to create account" });
    }
  });

  // Transactions routes
  app.get("/api/transactions", async (req, res) => {
    try {
      const accountId = req.query.accountId as string;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const transactions = await storage.getTransactions(accountId, limit);
      res.json(transactions);
    } catch (error) {
      console.error("Get transactions error:", error);
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const validated = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validated);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Create transaction error:", error);
      res.status(500).json({ error: "Failed to create transaction" });
    }
  });

  // Invoices routes
  app.get("/api/invoices", async (req, res) => {
    try {
      const entityId = req.query.entityId as string;
      const invoices = await storage.getInvoices(entityId);
      res.json(invoices);
    } catch (error) {
      console.error("Get invoices error:", error);
      res.status(500).json({ error: "Failed to fetch invoices" });
    }
  });

  app.post("/api/invoices", async (req, res) => {
    try {
      const validated = insertInvoiceSchema.parse(req.body);
      const invoice = await storage.createInvoice(validated);
      res.status(201).json(invoice);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Create invoice error:", error);
      res.status(500).json({ error: "Failed to create invoice" });
    }
  });

  // Stakeholders routes
  app.get("/api/stakeholders", async (req, res) => {
    try {
      const stakeholders = await storage.getStakeholders();
      res.json(stakeholders);
    } catch (error) {
      console.error("Get stakeholders error:", error);
      res.status(500).json({ error: "Failed to fetch stakeholders" });
    }
  });

  app.post("/api/stakeholders", async (req, res) => {
    try {
      const validated = insertStakeholderSchema.parse(req.body);
      const stakeholder = await storage.createStakeholder(validated);
      res.status(201).json(stakeholder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Create stakeholder error:", error);
      res.status(500).json({ error: "Failed to create stakeholder" });
    }
  });

  // Creative Sessions routes
  app.get("/api/creative-sessions", async (req, res) => {
    try {
      const entityId = req.query.entityId as string;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const sessions = await storage.getCreativeSessions(entityId, limit);
      res.json(sessions);
    } catch (error) {
      console.error("Get creative sessions error:", error);
      res.status(500).json({ error: "Failed to fetch creative sessions" });
    }
  });

  app.post("/api/creative-sessions", async (req, res) => {
    try {
      const validated = insertCreativeSessionSchema.parse(req.body);
      const session = await storage.createCreativeSession(validated);
      res.status(201).json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Create creative session error:", error);
      res.status(500).json({ error: "Failed to create creative session" });
    }
  });

  app.patch("/api/creative-sessions/:id", async (req, res) => {
    try {
      const updates = req.body;
      const session = await storage.updateCreativeSession(req.params.id, updates);
      if (!session) {
        return res.status(404).json({ error: "Creative session not found" });
      }
      res.json(session);
    } catch (error) {
      console.error("Update creative session error:", error);
      res.status(500).json({ error: "Failed to update creative session" });
    }
  });

  // Goals routes
  app.get("/api/goals", async (req, res) => {
    try {
      const entityId = req.query.entityId as string;
      const goals = await storage.getGoals(entityId);
      res.json(goals);
    } catch (error) {
      console.error("Get goals error:", error);
      res.status(500).json({ error: "Failed to fetch goals" });
    }
  });

  app.post("/api/goals", async (req, res) => {
    try {
      const validated = insertGoalSchema.parse(req.body);
      const goal = await storage.createGoal(validated);
      res.status(201).json(goal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Create goal error:", error);
      res.status(500).json({ error: "Failed to create goal" });
    }
  });

  app.patch("/api/goals/:id", async (req, res) => {
    try {
      const updates = req.body;
      const goal = await storage.updateGoal(req.params.id, updates);
      if (!goal) {
        return res.status(404).json({ error: "Goal not found" });
      }
      res.json(goal);
    } catch (error) {
      console.error("Update goal error:", error);
      res.status(500).json({ error: "Failed to update goal" });
    }
  });

  // Streaks routes
  app.get("/api/streaks", async (req, res) => {
    try {
      const entityId = req.query.entityId as string;
      const streaks = await storage.getStreaks(entityId);
      res.json(streaks);
    } catch (error) {
      console.error("Get streaks error:", error);
      res.status(500).json({ error: "Failed to fetch streaks" });
    }
  });

  app.post("/api/streaks", async (req, res) => {
    try {
      const validated = insertStreakSchema.parse(req.body);
      const streak = await storage.createStreak(validated);
      res.status(201).json(streak);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Create streak error:", error);
      res.status(500).json({ error: "Failed to create streak" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
