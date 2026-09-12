import app from './app.js';

const PORT=3000;
async function startServer() {
    try{
    const server=app.listen(PORT,()=>{
        console.log(`URL Shortener is running on port ${PORT}`);
    });
}
catch (error) {
    console.error('Failed to start URL Shortener:', error);
    process.exit(1);
}
}
startServer();