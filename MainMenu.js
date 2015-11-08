var MyGame = {};

MyGame.MainMenu = function (game){
    this.logo = null;
    this.start = null;
};

MyGame.MainMenu.prototype = {
    preload: function(){
        this.load.image('logo', 'assets/logo.png');
        this.load.spritesheet('start', 'assets/start.png', 313, 105, 2);
    },
    create: function(){
        this.stage.backgroundColor = '#fff';
        this.logo = this.add.sprite(225, 300, 'logo');
        this.logo.anchor.set(0.5);
        this.startButton = this.add.sprite(450, 300, 'start');
        this.startButton.anchor.set(0.5);
        this.startButton.angle = 90;
        this.startButton.inputEnabled = true;
        this.startFlash = this.startButton.animations.add('flash');

        this.startButton.events.onInputOver.add(function(){
            this.startButton.animations.play('flash', 10, true);
        }, this);

        this.startButton.events.onInputOut.add(function(){
            this.startButton.animations.stop();
        }, this);

        this.startButton.events.onInputDown.add(function(){
            this.state.start('Game');
        }, this);

        this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.enterKey.onDown.add(function(){
            this.state.start('Game');
        }, this);
    }
};
