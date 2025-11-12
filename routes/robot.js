const express = require('express');
const Robot = require('../models/Robot');

const router = express.Router();
const robot = new Robot();

// Connect to robot
router.post('/connect', async (req, res) => {
    try {
        const result = await robot.connect();
        res.json({
            success: true,
            message: 'Robot connected successfully',
            data: result
        });
    } catch (error) {
        console.error('Connection error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to connect to robot'
        });
    }
});

// Disconnect from robot
router.post('/disconnect', async (req, res) => {
    try {
        const result = await robot.disconnect();
        res.json({
            success: true,
            message: 'Robot disconnected successfully',
            data: result
        });
    } catch (error) {
        console.error('Disconnection error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to disconnect from robot'
        });
    }
});

// Get robot status
router.get('/status', async (req, res) => {
    try {
        const status = await robot.getStatus();
        res.json(status);
    } catch (error) {
        console.error('Status error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to get robot status'
        });
    }
});

// Send command to robot
router.post('/command', async (req, res) => {
    try {
        const { command, params = {} } = req.body;
        
        if (!command) {
            return res.status(400).json({
                success: false,
                message: 'Command is required'
            });
        }

        // Validate command
        const validCommands = ['move', 'rotate', 'stop'];
        if (!validCommands.includes(command)) {
            return res.status(400).json({
                success: false,
                message: `Invalid command. Valid commands: ${validCommands.join(', ')}`
            });
        }

        const result = await robot.executeCommand(command, params);
        res.json({
            success: true,
            message: `Command '${command}' executed successfully`,
            data: result
        });
    } catch (error) {
        console.error('Command execution error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to execute command'
        });
    }
});

// Emergency stop
router.post('/emergency-stop', async (req, res) => {
    try {
        const result = await robot.emergencyStop();
        res.json({
            success: true,
            message: 'Emergency stop executed',
            data: result
        });
    } catch (error) {
        console.error('Emergency stop error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to execute emergency stop'
        });
    }
});

// Reset robot position
router.post('/reset', async (req, res) => {
    try {
        const result = await robot.resetPosition();
        res.json({
            success: true,
            message: 'Robot position reset successfully',
            data: result
        });
    } catch (error) {
        console.error('Reset error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to reset robot position'
        });
    }
});

// Get robot capabilities
router.get('/capabilities', async (req, res) => {
    try {
        const capabilities = await robot.getCapabilities();
        res.json({
            success: true,
            data: capabilities
        });
    } catch (error) {
        console.error('Capabilities error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to get robot capabilities'
        });
    }
});

module.exports = router;
