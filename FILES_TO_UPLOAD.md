# Files to Upload to GitHub

## Essential Files (Must Include)

### Root Directory
- `README.md` - Main project documentation
- `package.json` - Node.js dependencies
- `server.js` - Express server
- `index.html` - Web interface entry point

### Backend Code
- `models/Robot.js` - Robot simulation logic
- `routes/robot.js` - API endpoints

### Frontend Code
- `src/App.jsx` - Main React application
- `src/components/RobotControl.jsx` - Control interface
- `src/components/RobotVisualization.jsx` - Robot display
- `src/components/StatusPanel.jsx` - Status monitoring
- `src/services/robotApi.js` - API client
- `src/styles/main.css` - Custom styles
- `src/utils/constants.js` - Configuration

### C# Application
- `RobotControlApp/` - Entire folder including:
  - `RobotControlApp/RobotControlApp.csproj`
  - `RobotControlApp/Program.cs`
  - `RobotControlApp/Models/` folder
  - `RobotControlApp/Services/` folder
  - `RobotControlApp/README.md`

### Documentation
- `SYSTEM_OVERVIEW.md` - Technical details
- `DEMO_RESULTS.md` - Test results
- `UPLOAD_INSTRUCTIONS.md` - GitHub upload guide

## Files to EXCLUDE

### Auto-generated
- `node_modules/` folder (too large, auto-generated)
- `package-lock.json` (optional, can exclude)
- `.replit` file (Replit specific)
- Any `.env` files (if they exist)

### C# Build Files
- `bin/` folders
- `obj/` folders
- Any `.dll` files

## Quick Copy Method

You can also copy-paste individual files:

1. Open each file in Replit
2. Select all text (Ctrl+A)
3. Copy (Ctrl+C)
4. Create new file in your local project
5. Paste content

## Directory Structure for GitHub

```
robot-control-system/
├── README.md
├── package.json
├── server.js
├── index.html
├── models/
│   └── Robot.js
├── routes/
│   └── robot.js
├── src/
│   ├── App.jsx
│   ├── components/
│   ├── services/
│   ├── styles/
│   └── utils/
├── RobotControlApp/
│   └── RobotControlApp/
│       ├── Program.cs
│       ├── Models/
│       └── Services/
└── Documentation files...
```

This structure will showcase your full-stack development skills perfectly on GitHub.