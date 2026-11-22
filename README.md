STL Generator Library — Frontend
The frontend for the STL Generator Library. This React application lets users browse OpenSCAD model templates, adjust their parameters, generate STL files through the backend API, preview the models in 3D, and download them.
Features
- Browse available model templates
- Select a template and edit its parameters
- Generate an STL through the backend
- Preview the generated STL in an interactive 3D viewer
- Download the generated model
Built With
- React
- TypeScript
- React Router
- Vite
- Three.js
- React Three Fiber
- React Three Drei
- STLLoader
Project Routes
Route	Page	Purpose
/	Home	Landing page with a link to the template library
/templates	Templates	Browse templates, edit parameters, and generate a model
/preview	Preview	View and download the generated STL


Getting Started
Requirements
- Node.js
- npm
- The STL Generator backend running locally or at a configured API address
Install Dependencies
From the frontend project directory, run:
npm install
Start the Development Server
npm run dev
Vite will print the local development URL in the terminal. The default is commonly:
http://localhost:5173
Open that address in your browser.
Backend Connection
The frontend communicates with the Spring Boot API.

The development backend address used by the application is:
http://localhost:8080
The frontend uses these endpoints:
Method	Endpoint	Purpose
GET	/api/template	Retrieves the available templates
POST	/api/generate	Sends a template ID and parameter values; receives the generated STL


If the backend is hosted at a different address, update the API URL used by the frontend. The backend must also allow requests from the frontend origin through its CORS configuration.
Generating and Previewing a Model
1. Open the application.
2. Select Browse Templates.
3. Choose a template.
4. Adjust its parameter values.
5. Click Preview Model.
6. Wait for the STL to generate and load in the viewer.
7. Rotate or zoom the model to inspect it.
8. Click Download STL to save the file.
STL Viewer
The preview page uses a Three.js-based viewer to load the generated STL geometry. The viewer supports interactive inspection using its orbit controls.

The generated STL is passed to the preview page as a temporary browser object URL. Because this URL is stored in navigation state, refreshing the preview page or opening it directly may result in no model being available. Generate a model from the Templates page to start a preview.
Main Frontend Files
The following are the main frontend areas:
- app/routes.ts — route definitions
- app/routes/Home.tsx — landing page
- app/routes/templates.tsx — template selection and parameter editor
- app/routes/Preview.tsx — STL preview and download page
- app/components/stlViewer.tsx — 3D STL viewer component
- Route-specific CSS files — page styling
File names and locations may change as the project develops.
Build
To create a production build:
npm run build
Use the deployment instructions for your hosting platform to publish the generated frontend build. Configure the deployed frontend to use the deployed backend URL rather than localhost.
Notes
- The backend and Docker-based OpenSCAD renderer must be available for model generation.
- STL preview requires a browser with WebGL support.
- The frontend does not store generated models permanently.
