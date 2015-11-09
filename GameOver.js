MyGame.GameOver = function (game){};

MyGame.GameOver.prototype = {
    preload: function(){
        this.load.image('gameover', 'assets/gameover.png');
        this.load.image('mainmenu', 'assets/mainmenu.png');
        this.load.image('playmore', 'assets/playmore.png');
    },
    create: function(){
        this.gameover = this.add.sprite(300, 120, 'gameover');
        this.gameover.anchor.set(0.5);

        this.mainmenu = this.add.sprite(140, 450, 'mainmenu');
        this.mainmenu.anchor.set(0.5);
        this.mainmenu.inputEnabled = true;

        this.playmore = this.add.sprite(400, 450, 'playmore');
        this.playmore.anchor.set(0.5);
        this.playmore.inputEnabled = true;

        this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.enterKey.onDown.add(function(){
            this.state.start('Game');
        }, this);

        this.playmore.events.onInputDown.add(function(){
            this.state.start('Game');
        }, this);

        this.escKey = this.input.keyboard.addKey(Phaser.Keyboard.ESC);

        this.escKey.onDown.add(function(){
            this.state.start('MainMenu');
        }, this);

        this.mainmenu.events.onInputDown.add(function(){
            this.state.start('MainMenu');
        }, this);

        this.scoreDisplay = this.add.text(300, 275, 'final time: ' + MyGame.finalTime, {font: 'bold 32px Helvetica'});
        this.scoreDisplay.anchor.set(0.5);
    }
};
