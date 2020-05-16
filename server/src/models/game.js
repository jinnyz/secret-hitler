const GameState = Object.freeze({"WAITING" : 1, "INPROGRESS" : 2, "COMPLETE" : 3});

class Game {
    constructor(id, inviteCode) {
        this.id = id;
        this.inviteCode = inviteCode;
        this.users = [];
        this.gameState = GameState.WAITING;
    }
}

module.exports = Game;