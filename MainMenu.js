var MyGame = {
    finalTime: null
};

MyGame.MainMenu = function (game){
    this.logo = null;
    this.start = null;
};

MyGame.MainMenu.prototype = {
    preload: function(){
        this.load.image('logo', 'assets/logo.png');
        this.load.spritesheet('play', 'assets/play.png', 310, 140, 2);
    },
    create: function(){
        this.centerX = game.width / 2;
        this.centerY = game.height / 2;

        this.stage.backgroundColor = '#fff';
        this.logo = this.add.sprite(this.centerX - 125, this.centerY, 'logo');
        this.logo.anchor.set(0.5);
        this.playButton = this.add.sprite(this.centerX + 125, this.centerY, 'play');
        this.playButton.anchor.set(0.5);
        this.playButton.angle = 90;
        this.playButton.inputEnabled = true;
        this.startFlash = this.playButton.animations.add('flash');

        this.playButton.animations.play('flash', 10, true);

        this.playButton.events.onInputDown.add(function(){
            this.state.start('Game');
        }, this);

        this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.enterKey.onDown.add(function(){
            this.state.start('Game');
        }, this);
    }
};
