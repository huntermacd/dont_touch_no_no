MyGame.GameOver = function (game){};

MyGame.GameOver.prototype = {
    preload: function(){
        this.load.image('gameover', 'assets/gameover.png');
    },
    create: function(){
        this.gameover = this.add.sprite(300, 300, 'gameover');
        this.gameover.anchor.set(0.5);

        this.time.events.add(1000, function(){
            this.state.start('MainMenu');
        }, this);
    }
};
