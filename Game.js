MyGame.Game = function(game){
    this.rs = 0;
    this.minutes = 0;
    this.options = [-15, game.width + 15];
};

MyGame.Game.prototype = {
    preload: function(){
        this.load.spritesheet('man', 'assets/man.png', 15, 15, 2);
        this.load.image('center', 'assets/center.png');
        this.load.image('baddie', 'assets/baddie.png');
    },
    create: function(){
        this.graphics = this.add.graphics(300, 300);

        this.baddies = this.add.group();

        this.addBaddie();

        this.man = this.add.sprite(300, 300, 'man');
        this.man.anchor.x = 0.5;
        this.man.pivot.y = 70;
        this.man.rotation = 12.5664;

        this.flash = this.man.animations.add('flash');
        this.man.animations.play('flash', 10, true);

        this.keys = this.input.keyboard.createCursorKeys();

        this.center = this.add.sprite(300, 300, 'center');
        this.center.anchor.set(0.5);

        this.rsText = this.add.text(50, 50, 'rotations: ' + this.rs);

        this.clock = this.time.create(false);
        this.clock.loop(1000, this.addBaddie, this);
        this.clock.start();

        this.clockText = this.add.text(450, 50, this.formatTime());

        this.baddieTotal = this.add.text(50, 25, 'total baddies: ' + this.baddies.length);
    },
    update: function(){
        if (this.keys.right.isDown){
            this.man.rotation += .1;
            this.graphics.clear();
            this.graphics.moveTo(0, 0);
            this.graphics.beginFill(0xCCCCCC);
            this.graphics.arc(0, 0, 63, this.math.degToRad(-90), this.man.rotation - 1.5708, false);
            this.graphics.endFill();
        }

        if (this.keys.left.isDown){
            this.man.rotation -= .1;
            this.graphics.clear();
            this.graphics.moveTo(0, 0);
            this.graphics.beginFill(0xCCCCCC);
            this.graphics.arc(0, 0, 63, this.math.degToRad(-90), this.man.rotation - 1.5708, false);
            this.graphics.endFill();
        }

        this.baddies.forEach(function(baddie){
            if (baddie.x === 300){
                baddie.destroy();
                this.addBaddie();
            }

            if (this.checkOverlap(this.man, baddie)){
                this.state.start('GameOver');
            }
        }, this);

        if (this.man.rotation > 6.1 && this.man.rotation < 6.3 || this.man.rotation > 18.7 && this.man.rotation < 18.9){
            this.man.rotation = 12.5664;
            this.rs += 1;
            this.baddies.removeChildAt(this.baddies.length - 1);
        }

        this.rsText.setText('rotations: ' + this.rs);

        this.clockText.setText(this.formatTime());

        this.baddieTotal.setText('total baddies: ' + this.baddies.length);
    },
    addBaddie: function(){
        var randomX = this.rnd.integerInRange(0, game.width);
        var randomY = this.rnd.integerInRange(0, game.height);

        var baddie;

        if (this.rnd.integerInRange(1, 2) === 1){
            baddie = this.add.sprite(randomX, Phaser.ArrayUtils.getRandomItem(this.options), 'baddie');
        } else {
            baddie = this.add.sprite(Phaser.ArrayUtils.getRandomItem(this.options), randomY, 'baddie');
        }

        baddie.anchor.set(0.5);
        this.add.tween(baddie).to({x: 300, y: 300}, 2000, Phaser.Easing.Default, true, this.rnd.integerInRange(0, 1000));

        this.baddies.add(baddie);
    },
    checkOverlap: function(spriteA, spriteB){
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },
    formatTime: function(){
        var seconds = this.clock.seconds.toFixed(2);

        if (seconds < 10){
            seconds = '0' + seconds;
        }

        if (seconds > 59.99){
            this.clock.stop();
            this.clock.start();
            this.minutes++;
        }

        return this.minutes + ':' + seconds;
    },
    shutdown: function(){
        this.rs = 0;
        this.minutes = 0;
    }
};