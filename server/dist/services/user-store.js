"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUsers = loadUsers;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.loadPlayerSave = loadPlayerSave;
exports.savePlayerData = savePlayerData;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const DATA_DIR = path.join(__dirname, '..', '..', 'data');
function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}
// 用户账号文件
function usersFilePath() {
    ensureDataDir();
    return path.join(DATA_DIR, 'users.json');
}
// 玩家存档文件
function playerSavePath(username) {
    ensureDataDir();
    const safe = username.replace(/[^a-zA-Z0-9一-鿿_-]/g, '_');
    return path.join(DATA_DIR, `save_${safe}.json`);
}
function loadUsers() {
    const fp = usersFilePath();
    if (!fs.existsSync(fp))
        return {};
    try {
        return JSON.parse(fs.readFileSync(fp, 'utf-8'));
    }
    catch {
        return {};
    }
}
function saveUsers(users) {
    ensureDataDir();
    fs.writeFileSync(usersFilePath(), JSON.stringify(users, null, 2), 'utf-8');
}
function registerUser(username, password) {
    const users = loadUsers();
    if (users[username])
        return null; // 已存在
    const record = {
        username,
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString(),
    };
    users[username] = record;
    saveUsers(users);
    return record;
}
function loginUser(username, password) {
    const users = loadUsers();
    const record = users[username];
    if (!record)
        return null;
    if (record.passwordHash !== hashPassword(password))
        return null;
    return record;
}
// 存档读写
function loadPlayerSave(username) {
    const fp = playerSavePath(username);
    if (!fs.existsSync(fp))
        return null;
    try {
        return JSON.parse(fs.readFileSync(fp, 'utf-8'));
    }
    catch {
        return null;
    }
}
function savePlayerData(username, data) {
    ensureDataDir();
    fs.writeFileSync(playerSavePath(username), JSON.stringify(data, null, 2), 'utf-8');
}
