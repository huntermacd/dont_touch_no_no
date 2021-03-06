var MyGame = {
    finalTime: null,
    scaleRatio: window.devicePixelRatio / 3
};

MyGame.MainMenu = function (game){
    this.logo = null;
    this.start = null;
};

MyGame.MainMenu.prototype = {
    init: function(){
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    },
    preload: function(){
        this.load.image('logo', 'assets/logo.png');
        this.load.image('play', 'assets/play.png');
    },
    create: function(){
        this.centerX = game.width / 2;
        this.centerY = game.height / 2;

        this.stage.backgroundColor = '#fff';

        this.logo = this.add.sprite(this.centerX, this.centerY, 'logo');
        this.logo.scale.setTo(MyGame.scaleRatio);
        this.logo.anchor.set(0.5, 1);

        this.playButton = this.add.sprite(this.centerX, this.centerY + 10, 'play');
        this.playButton.scale.setTo(MyGame.scaleRatio);
        this.playButton.anchor.set(0.5, 0);
        this.playButton.inputEnabled = true;

        this.playButton.events.onInputDown.add(function(){
            this.state.start('Game');
        }, this);

        this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        this.rightKey.onDown.add(function(){
            this.state.start('Game');
        }, this);
    }
};
