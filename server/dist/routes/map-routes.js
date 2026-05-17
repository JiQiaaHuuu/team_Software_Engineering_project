"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_1 = require("../middleware/session");
const locations_1 = require("../data/locations");
const router = (0, express_1.Router)();
// GET /api/map/current
router.get('/current', session_1.sessionMiddleware, (req, res) => {
    const session = req.gameSession;
    const currentIdx = session.map.getCurrentLocationIndex();
    const current = session.map.getCurrentLocation();
    const allLocations = session.map.locations.map((loc, i) => ({
        index: i,
        name: loc.name,
        x: locations_1.LOCATION_COORDS[i]?.x ?? 0,
        y: locations_1.LOCATION_COORDS[i]?.y ?? 0,
        connections: Object.entries(loc.connections).map(([dir, toIdx]) => ({
            direction: dir,
            toIndex: toIdx,
        })),
        wildPokemons: loc.wildPokemons,
    }));
    res.json({
        currentLocationIndex: currentIdx,
        locationName: current.name,
        locationDescription: current.description,
        availableDirections: session.map.getAvailableDirections(),
        wildPokemons: session.map.getWildPokemons(),
        allLocations,
    });
});
exports.default = router;
