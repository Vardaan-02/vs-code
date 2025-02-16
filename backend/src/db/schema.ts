import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  integer,
  jsonb,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

// Enums
export const roleEnum = pgEnum("role", ["owner", "editor", "viewer"]);
export const languageEnum = pgEnum("language", ["js", "python", "cpp", "rust"]);
export const themeEnum = pgEnum("theme", ["light", "dark", "custom"]);

// Users Table (users)
export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).unique().notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
  avatar: varchar({ length: 255 }),
  github_id: varchar({ length: 255 }).unique(),
  is_verified: boolean().default(false),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

// Sessions Table (sessions)
export const sessionsTable = pgTable("sessions", {
  id: uuid().primaryKey().defaultRandom(),
  user_id: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  token: text().notNull(),
  expires_at: timestamp().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});

// Projects Table
export const projectsTable = pgTable("projects", {
  id: uuid().primaryKey().defaultRandom(),
  user_id: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

// Folders Table
export const foldersTable: any = pgTable("folders", {
  id: uuid().primaryKey().defaultRandom(),
  project_id: uuid()
    .notNull()
    .references(() => projectsTable.id, { onDelete: "cascade" }),
  parent_folder_id: uuid().references(() => foldersTable.id, {
    onDelete: "cascade",
  }),
  name: varchar({ length: 255 }).notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

// Files Table
export const filesTable = pgTable("files", {
  id: uuid().primaryKey().defaultRandom(),
  project_id: uuid()
    .notNull()
    .references(() => projectsTable.id, { onDelete: "cascade" }),
  parent_folder_id: uuid().references(() => foldersTable.id, {
    onDelete: "cascade",
  }),
  name: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 50 }).notNull(),
  storage_path: varchar({ length: 500 }).notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

// Collaborators Table (collaborators)
export const collaboratorsTable = pgTable("collaborators", {
  id: uuid().primaryKey().defaultRandom(),
  project_id: uuid()
    .notNull()
    .references(() => projectsTable.id, { onDelete: "cascade" }),
  user_id: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  role: roleEnum().default("owner"),
  added_at: timestamp().defaultNow().notNull(),
});

// Real-Time Collaboration Table (collab_sessions)
export const collabSessionsTable = pgTable("collab_sessions", {
  id: uuid().primaryKey().defaultRandom(),
  project_id: uuid()
    .notNull()
    .references(() => projectsTable.id, { onDelete: "cascade" }),
  editor_state: jsonb().notNull(),
  active_users: jsonb().notNull(), // Array of user IDs
  last_updated: timestamp().defaultNow().notNull(),
});

// Execution History Table (executions)
export const executionsTable = pgTable("executions", {
  id: uuid().primaryKey().defaultRandom(),
  user_id: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  project_id: uuid()
    .notNull()
    .references(() => projectsTable.id, { onDelete: "cascade" }),
  file_id: uuid()
    .notNull()
    .references(() => filesTable.id, { onDelete: "cascade" }),
  language: languageEnum().default("js"),
  input: text(),
  output: text(),
  error: text(),
  execution_time: integer(),
  executed_at: timestamp().defaultNow().notNull(),
});

// Extensions Store (extensions)
export const extensionsTable = pgTable("extensions", {
  id: uuid().primaryKey().defaultRandom(),
  author_id: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  name: varchar({ length: 255 }).unique().notNull(),
  description: text(),
  repository_url: varchar({ length: 255 }).notNull(),
  downloads: integer().default(0).notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

// User Settings Table (user_settings)
export const userSettingsTable = pgTable("user_settings", {
  id: uuid().primaryKey().defaultRandom(),
  user_id: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  theme: themeEnum().default("dark"),
  keybindings: jsonb().notNull(),
  extensions: jsonb().notNull(),
});
