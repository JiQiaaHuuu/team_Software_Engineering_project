"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_1 = require("../middleware/session");
const config_1 = require("../config");
const router = (0, express_1.Router)();
// GET /api/shop/items
router.get('/items', session_1.sessionMiddleware, (req, res) => {
    res.json({
        items: config_1.SHOP_ITEMS,
        playerGold: req.gameSession.player.gold,
    });
});
// POST /api/shop/buy
router.post('/buy', session_1.sessionMiddleware, (req, res) => {
    const session = req.gameSession;
    const { shopIndex, quantity } = req.body;
    const qty = quantity ?? 1;
    if (shopIndex == null || shopIndex < 0 || shopIndex >= config_1.SHOP_ITEMS.length) {
        res.status(400).json({ success: false, message: '无效商品' });
        return;
    }
    const shopItem = config_1.SHOP_ITEMS[shopIndex];
    const totalPrice = shopItem.price * qty;
    if (session.player.gold < totalPrice) {
        res.json({ success: false, message: `金币不足！需要 ${totalPrice}，拥有 ${session.player.gold}` });
        return;
    }
    session.player.gold -= totalPrice;
    if (shopItem.type === 'ball' && shopItem.ballIndex != null) {
        session.player.pokeballs[shopItem.ballIndex] += qty;
    }
    else if (shopItem.type === 'item' && shopItem.itemIndex != null) {
        session.player.items[shopItem.itemIndex].count += qty;
    }
    res.json({
        success: true,
        message: `购买了 ${qty} 个${shopItem.name}，花费 ${totalPrice} 金币`,
        gold: session.player.gold,
        ballCount: session.player.getTotalBalls(),
        ballCounts: [...session.player.pokeballs],
        items: session.player.items.map(it => ({
            name: it.name, count: it.count, healPercent: it.healPercent,
            expAmount: it.expAmount, isRevive: it.isRevive,
        })),
    });
});
exports.default = router;
