const ROBOT_CONSTANTS = {
    // Movement parameters
    MOVE_SPEED: {
        MIN: 10,
        MAX: 100,
        DEFAULT: 50
    },
    
    ROTATION_SPEED: {
        MIN: 10,
        MAX: 100,
        DEFAULT: 30
    },
    
    // Position limits (for safety)
    POSITION_LIMITS: {
        X_MIN: -100,
        X_MAX: 100,
        Y_MIN: -100,
        Y_MAX: 100
    },
    
    // Movement directions
    DIRECTIONS: {
        FORWARD: 'forward',
        BACKWARD: 'backward',
        LEFT: 'left',
        RIGHT: 'right',
        ROTATE_LEFT: 'rotate_left',
        ROTATE_RIGHT: 'rotate_right'
    },
    
    // Robot commands
    COMMANDS: {
        MOVE: 'move',
        ROTATE: 'rotate',
        STOP: 'stop',
        EMERGENCY_STOP: 'emergency_stop',
        RESET: 'reset'
    },
    
    // Status polling interval (ms)
    STATUS_POLL_INTERVAL: 1000,
    
    // Connection timeout (ms)
    CONNECTION_TIMEOUT: 5000,
    
    // Battery levels
    BATTERY_LEVELS: {
        CRITICAL: 10,
        LOW: 25,
        NORMAL: 50,
        HIGH: 75
    },
    
    // Default robot state
    DEFAULT_ROBOT_STATE: {
        isConnected: false,
        position: { x: 0, y: 0, rotation: 0 },
        isMoving: false,
        battery: 100,
        lastCommand: null,
        error: null
    }
};
