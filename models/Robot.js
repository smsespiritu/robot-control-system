class Robot {
    constructor() {
        this.state = {
            isConnected: false,
            position: { x: 0, y: 0, rotation: 0 },
            isMoving: false,
            battery: 100,
            lastCommand: null,
            error: null,
            connectedAt: null
        };
        
        // Movement parameters
        this.config = {
            maxSpeed: 100,
            minSpeed: 10,
            positionLimits: {
                xMin: -100,
                xMax: 100,
                yMin: -100,
                yMax: 100
            },
            batteryDrainRate: 0.1, // per command
            moveDistance: 5, // units per move command
            rotationAngle: 15 // degrees per rotation command
        };
        
        // Simulate battery drain over time
        this.batteryInterval = null;
        this.startBatterySimulation();
    }

    // Connect to robot (mock implementation)
    async connect() {
        return new Promise((resolve, reject) => {
            // Simulate connection delay
            setTimeout(() => {
                if (Math.random() > 0.1) { // 90% success rate
                    this.state.isConnected = true;
                    this.state.connectedAt = new Date();
                    this.state.error = null;
                    
                    console.log('Robot connected successfully');
                    resolve({
                        connectionId: Date.now(),
                        timestamp: this.state.connectedAt,
                        robotModel: 'MockBot-2000',
                        firmwareVersion: '1.2.3'
                    });
                } else {
                    const error = new Error('Connection failed: Robot not responding');
                    console.error(error.message);
                    reject(error);
                }
            }, 1000 + Math.random() * 2000); // 1-3 second delay
        });
    }

    // Disconnect from robot
    async disconnect() {
        return new Promise((resolve) => {
            this.state.isConnected = false;
            this.state.isMoving = false;
            this.state.connectedAt = null;
            
            console.log('Robot disconnected');
            resolve({
                timestamp: new Date(),
                message: 'Disconnected successfully'
            });
        });
    }

    // Get current robot status
    async getStatus() {
        // Simulate small status update delay
        await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
        
        return {
            ...this.state,
            timestamp: new Date(),
            uptime: this.state.connectedAt ? Date.now() - this.state.connectedAt.getTime() : 0
        };
    }

    // Execute robot command
    async executeCommand(command, params = {}) {
        if (!this.state.isConnected) {
            throw new Error('Robot is not connected');
        }

        if (this.state.battery <= 0) {
            throw new Error('Robot battery is depleted');
        }

        return new Promise((resolve, reject) => {
            // Simulate command execution time
            const executionTime = 500 + Math.random() * 1000; // 0.5-1.5 seconds
            
            this.state.isMoving = true;
            this.state.lastCommand = command;
            
            setTimeout(() => {
                try {
                    let result = {};
                    
                    switch (command) {
                        case 'move':
                            result = this.executeMovement(params);
                            break;
                        case 'rotate':
                            result = this.executeRotation(params);
                            break;
                        case 'stop':
                            result = this.executeStop();
                            break;
                        default:
                            throw new Error(`Unknown command: ${command}`);
                    }
                    
                    // Drain battery
                    this.drainBattery(this.config.batteryDrainRate);
                    
                    this.state.isMoving = false;
                    this.state.error = null;
                    
                    console.log(`Command '${command}' executed:`, result);
                    resolve(result);
                    
                } catch (error) {
                    this.state.isMoving = false;
                    this.state.error = error.message;
                    console.error(`Command '${command}' failed:`, error.message);
                    reject(error);
                }
            }, executionTime);
        });
    }

    // Execute movement command
    executeMovement(params) {
        const { direction, speed = 50, duration = 1000 } = params;
        
        if (!direction) {
            throw new Error('Movement direction is required');
        }
        
        if (speed < this.config.minSpeed || speed > this.config.maxSpeed) {
            throw new Error(`Speed must be between ${this.config.minSpeed} and ${this.config.maxSpeed}`);
        }
        
        const distance = (speed / 100) * this.config.moveDistance;
        const oldPosition = { ...this.state.position };
        
        switch (direction) {
            case 'forward':
                this.state.position.y += distance * Math.cos(this.state.position.rotation * Math.PI / 180);
                this.state.position.x += distance * Math.sin(this.state.position.rotation * Math.PI / 180);
                break;
            case 'backward':
                this.state.position.y -= distance * Math.cos(this.state.position.rotation * Math.PI / 180);
                this.state.position.x -= distance * Math.sin(this.state.position.rotation * Math.PI / 180);
                break;
            case 'left':
                this.state.position.x -= distance * Math.cos(this.state.position.rotation * Math.PI / 180);
                this.state.position.y += distance * Math.sin(this.state.position.rotation * Math.PI / 180);
                break;
            case 'right':
                this.state.position.x += distance * Math.cos(this.state.position.rotation * Math.PI / 180);
                this.state.position.y -= distance * Math.sin(this.state.position.rotation * Math.PI / 180);
                break;
            default:
                throw new Error(`Invalid movement direction: ${direction}`);
        }
        
        // Apply position limits
        this.enforcePositionLimits();
        
        return {
            command: 'move',
            direction,
            distance: distance.toFixed(2),
            oldPosition,
            newPosition: { ...this.state.position },
            speed,
            duration
        };
    }

    // Execute rotation command
    executeRotation(params) {
        const { direction, speed = 30, duration = 500 } = params;
        
        if (!direction) {
            throw new Error('Rotation direction is required');
        }
        
        const angle = (speed / 100) * this.config.rotationAngle;
        const oldRotation = this.state.position.rotation;
        
        switch (direction) {
            case 'left':
                this.state.position.rotation -= angle;
                break;
            case 'right':
                this.state.position.rotation += angle;
                break;
            default:
                throw new Error(`Invalid rotation direction: ${direction}`);
        }
        
        // Normalize rotation to 0-360 degrees
        this.state.position.rotation = ((this.state.position.rotation % 360) + 360) % 360;
        
        return {
            command: 'rotate',
            direction,
            angle: angle.toFixed(2),
            oldRotation: oldRotation.toFixed(2),
            newRotation: this.state.position.rotation.toFixed(2),
            speed,
            duration
        };
    }

    // Execute stop command
    executeStop() {
        this.state.isMoving = false;
        
        return {
            command: 'stop',
            position: { ...this.state.position },
            timestamp: new Date()
        };
    }

    // Emergency stop
    async emergencyStop() {
        this.state.isMoving = false;
        this.state.lastCommand = 'emergency_stop';
        
        console.log('EMERGENCY STOP executed');
        
        return {
            command: 'emergency_stop',
            position: { ...this.state.position },
            timestamp: new Date(),
            message: 'Emergency stop executed successfully'
        };
    }

    // Reset robot position
    async resetPosition() {
        if (this.state.isMoving) {
            throw new Error('Cannot reset position while robot is moving');
        }
        
        const oldPosition = { ...this.state.position };
        this.state.position = { x: 0, y: 0, rotation: 0 };
        this.state.lastCommand = 'reset';
        
        console.log('Robot position reset to origin');
        
        return {
            command: 'reset',
            oldPosition,
            newPosition: { ...this.state.position },
            timestamp: new Date()
        };
    }

    // Get robot capabilities
    async getCapabilities() {
        return {
            movements: ['forward', 'backward', 'left', 'right'],
            rotations: ['left', 'right'],
            speedRange: { min: this.config.minSpeed, max: this.config.maxSpeed },
            positionLimits: this.config.positionLimits,
            features: [
                'position_tracking',
                'rotation_control',
                'battery_monitoring',
                'emergency_stop',
                'remote_control'
            ],
            specifications: {
                model: 'MockBot-2000',
                maxPayload: '5kg',
                maxSpeed: '2m/s',
                batteryLife: '8 hours',
                connectivity: ['WiFi', 'Bluetooth']
            }
        };
    }

    // Enforce position limits
    enforcePositionLimits() {
        const { xMin, xMax, yMin, yMax } = this.config.positionLimits;
        
        this.state.position.x = Math.max(xMin, Math.min(xMax, this.state.position.x));
        this.state.position.y = Math.max(yMin, Math.min(yMax, this.state.position.y));
    }

    // Simulate battery drain
    drainBattery(amount) {
        this.state.battery = Math.max(0, this.state.battery - amount);
        
        if (this.state.battery <= 0) {
            console.warn('Robot battery depleted');
            this.state.isConnected = false;
        }
    }

    // Start battery simulation (slow drain over time)
    startBatterySimulation() {
        this.batteryInterval = setInterval(() => {
            if (this.state.isConnected && this.state.battery > 0) {
                // Slow battery drain (0.01% per second when connected)
                this.state.battery = Math.max(0, this.state.battery - 0.01);
                
                if (this.state.battery <= 0) {
                    console.warn('Robot battery depleted - auto disconnect');
                    this.state.isConnected = false;
                }
            }
        }, 1000);
    }

    // Stop battery simulation
    stopBatterySimulation() {
        if (this.batteryInterval) {
            clearInterval(this.batteryInterval);
            this.batteryInterval = null;
        }
    }

    // Cleanup method
    destroy() {
        this.stopBatterySimulation();
        this.state.isConnected = false;
    }
}

module.exports = Robot;
