# Robot Control System

A complete multi-platform robot control system featuring a Node.js backend server, React web interface, and C# console application. This project demonstrates full-stack development with real-time robot simulation, physics, and cross-platform API integration.

![Robot Control Demo](https://img.shields.io/badge/status-working-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-v20-green) ![.NET](https://img.shields.io/badge/.NET-8.0-blue) ![React](https://img.shields.io/badge/React-18-61dafb)

## Features

### Multi-Interface Control
- **Web Interface**: Modern React application with real-time robot visualization
- **C# Console App**: Cross-platform command-line interface with live status monitoring
- **REST API**: Complete API for custom integrations

### Robot Capabilities
- **Movement Control**: Forward, backward, left, right with variable speed (1-100%)
- **Rotation Control**: Left and right rotation with adjustable speed
- **Real-time Tracking**: Live position (X,Y) and rotation angle monitoring
- **Battery Simulation**: Realistic battery drain during operations
- **Emergency Safety**: Immediate stop functionality
- **Position Reset**: Return to origin command

### Advanced Features
- **Physics Simulation**: Realistic movement calculations with rotation awareness
- **Real-time Updates**: Live status streaming across all interfaces
- **Error Handling**: Comprehensive error management and connection recovery
- **Cross-platform**: Works on Windows, macOS, and Linux

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Web     │    │   C# Console    │    │   Direct API    │
│   Interface     │    │   Application   │    │   Integration   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴───────────┐
                    │    Node.js Server       │
                    │    (Express.js API)     │
                    └─────────────┬───────────┘
                                  │
                    ┌─────────────┴───────────┐
                    │   Robot Simulation      │
                    │   (Mock Hardware)       │
                    └─────────────────────────┘
```

## Quick Start

### Prerequisites
- Node.js 18+
- .NET 8.0 SDK
- Modern web browser

### 1. Start the Robot Server
```bash
npm install
node server.js
```
Server runs on http://localhost:8000

### 2. Use Web Interface
Open http://localhost:8000 in your browser for the visual robot control panel.

### 3. Run C# Console Application
```bash
cd RobotControlApp/RobotControlApp
dotnet restore
dotnet run
```

## API Documentation

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/robot/connect` | POST | Connect to robot |
| `/api/robot/disconnect` | POST | Disconnect from robot |
| `/api/robot/status` | GET | Get current robot status |
| `/api/robot/command` | POST | Send movement/rotation commands |
| `/api/robot/emergency-stop` | POST | Emergency stop |
| `/api/robot/reset` | POST | Reset robot position |

### Example Usage
```bash
# Connect to robot
curl -X POST http://localhost:8000/api/robot/connect

# Move robot forward
curl -X POST http://localhost:8000/api/robot/command \
  -H "Content-Type: application/json" \
  -d '{"command":"move","params":{"direction":"forward","speed":75}}'

# Get status
curl http://localhost:8000/api/robot/status
```

## C# Console Commands

| Command | Action |
|---------|--------|
| 1 | Move Forward |
| 2 | Move Backward |
| 3 | Move Left |
| 4 | Move Right |
| 5 | Rotate Left |
| 6 | Rotate Right |
| 7 | Stop |
| 8 | Emergency Stop |
| 9 | Reset Position |
| 0 | Disconnect |
| q | Quit Application |

Enter any number 1-100 to set movement speed.

## Project Structure

```
robot-control-system/
├── README.md                    # This file
├── SYSTEM_OVERVIEW.md          # Detailed technical overview
├── DEMO_RESULTS.md             # Demo test results
├── package.json                # Node.js dependencies
├── server.js                   # Express.js server
├── index.html                  # Web interface entry point
├── models/
│   └── Robot.js               # Robot simulation logic
├── routes/
│   └── robot.js               # API route handlers
├── src/                       # React components
│   ├── components/
│   ├── services/
│   ├── styles/
│   └── utils/
└── RobotControlApp/           # C# console application
    ├── README.md
    └── RobotControlApp/
        ├── Program.cs
        ├── Models/
        └── Services/
```

## Technology Stack

### Backend
- **Node.js** with Express.js framework
- **REST API** with JSON responses
- **CORS** enabled for cross-origin requests
- **Real-time** status updates

### Frontend
- **React 18** with hooks (useState, useEffect)
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **Feather Icons** for UI elements

### C# Application
- **.NET 8.0** console application
- **HttpClient** for API communication
- **Newtonsoft.Json** for JSON serialization
- **Real-time status** monitoring with timers

## Demo Results

The system has been successfully tested with the following operations:
- Forward movement (75% speed): (0,0) → (0,3.75)
- Right rotation (60% speed): 0° → 9°
- Left movement (50% speed): Complex coordinate calculation with rotation
- Emergency stop: Immediate halt
- Position reset: Return to origin (0,0,0°)

Battery simulation shows realistic drain from 100% to 99.5% after operations.

## Development

### Running in Development
```bash
# Start server with auto-reload
npm run dev  # or node server.js

# Build C# application
cd RobotControlApp/RobotControlApp
dotnet build
```

### Testing API
All endpoints can be tested using curl commands or tools like Postman. The robot simulation provides realistic responses without requiring physical hardware.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Author

Created by SMS Espiritu - [GitHub](https://github.com/smsespiritu)

---

**Note**: This is a simulation system for development and demonstration purposes. The robot behavior is simulated with realistic physics and does not require actual robot hardware.