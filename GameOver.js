MyGame.GameOver = function (game){};

MyGame.GameOver.prototype = {
    preload: function(){
        this.load.image('gameover', 'assets/gameover.png');
        this.load.image('mainmenu', 'assets/mainmenu.png');
        this.load.image('playmore', 'assets/playmore.png');
    },
    create: function(){
        this.centerX = game.width / 2;
        this.centerY = game.height / 2;

        this.scoreDisplay = this.add.text(this.centerX, this.centerY, 'final time: ' + MyGame.finalTime, {font: 'bold 32px Helvetica'});
        this.scoreDisplay.anchor.set(0.5);

        this.gameover = this.add.sprite(this.centerX, this.scoreDisplay.y - this.scoreDisplay.height, 'gameover');
        this.gameover.scale.setTo(MyGame.scaleRatio);
        this.gameover.anchor.set(0.5, 1);

        this.mainmenu = this.add.sprite(this.centerX - 100, this.scoreDisplay.y + this.scoreDisplay.height, 'mainmenu');
        this.mainmenu.scale.setTo(MyGame.scaleRatio);
        this.mainmenu.anchor.set(0.5, 0);
        this.mainmenu.inputEnabled = true;

        this.playmore = this.add.sprite(this.mainmenu.x + 200, this.mainmenu.y, 'playmore');
        this.playmore.scale.setTo(MyGame.scaleRatio);
        this.playmore.anchor.set(0.5, 0);
        this.playmore.inputEnabled = true;

        this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        this.rightKey.onDown.add(function(){
            this.state.start('Game');
        }, this);

        this.playmore.events.onInputDown.add(function(){
            this.state.start('Game');
        }, this);

        this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);

        this.leftKey.onDown.add(function(){
            this.state.start('MainMenu');
        }, this);

        this.mainmenu.events.onInputDown.add(function(){
            this.state.start('MainMenu');
        }, this);
    }
};
