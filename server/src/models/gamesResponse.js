module.exports.CreateGameResponse = class {
    constructor(id, inviteCode, userId) {
        this.id = id; 
        this.inviteCode = inviteCode;
        this.userId = userId;
    }
}

module.exports.JoinGameResponse = class {
    constructor(id, inviteCode, users, userId) {
        this.id = id; 
        this.inviteCode = inviteCode;
        this.users = users;
        this.userId = userId;
    }
}

module.exports.GetGameResponse = class {
    constructor(id, inviteCode, users) {
        this.id = id; 
        this.inviteCode = inviteCode; 
        this.users = users;
    }
}

