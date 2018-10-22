import server from "./server";

const PORT = 1337;

server.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});