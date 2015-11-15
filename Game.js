MyGame.Game = function(game){
    this.rs = 0;
    this.minutes = 0;
};

MyGame.Game.prototype = {
    preload: function(){
        this.load.spritesheet('man', 'assets/man.png', 45, 45, 2);
        this.load.image('center', 'assets/center.png');
        this.load.image('baddie', 'assets/baddie.png');
    },
    create: function(){
        this.centerX = game.width / 2;
        this.centerY = game.height / 2;

        this.leftPanel = new Phaser.Rectangle(0, 0, this.centerX, game.height);

        this.graphics = this.add.graphics(this.centerX, this.centerY);
        this.graphics.scale.setTo(MyGame.scaleRatio);

        this.baddies = this.add.group();

        this.addBaddie();

        this.man = this.add.sprite(this.centerX, this.centerY, 'man');
        this.man.scale.setTo(MyGame.scaleRatio);
        this.man.anchor.x = 0.5;
        this.man.pivot.y = 210;
        this.man.rotation = 12.5664;

        this.flash = this.man.animations.add('flash');
        this.man.animations.play('flash', 10, true);

        this.keys = this.input.keyboard.createCursorKeys();

        this.center = this.add.sprite(this.centerX, this.centerY, 'center');
        this.center.scale.setTo(MyGame.scaleRatio);
        this.center.anchor.set(0.5);

        this.rsText = this.add.text(50, 50, 'rotations: ' + this.rs);

        this.clock = this.time.create(false);
        this.clock.loop(1000, this.addBaddie, this);
        this.clock.start();

        this.clockText = this.add.text(game.width - 150, 25, this.formatTime());

        this.baddieTotal = this.add.text(50, 25, 'total baddies: ' + this.baddies.length);
    },
    update: function(){
        if (this.keys.right.isDown){
            this.man.rotation += .1;
            this.drawDisc();
        }

        if (this.keys.left.isDown){
            this.man.rotation -= .1;
            this.drawDisc();
        }

        if (this.input.pointer1.isDown){
            if (this.leftPanel.contains(this.input.pointer1.x, this.input.pointer1.y)){
                this.man.rotation -= .1;
            } else {
                this.man.rotation += .1;
            }
            this.drawDisc();
        }

        this.baddies.forEach(function(baddie){
            if (baddie.x === this.centerX){
                baddie.destroy();
                this.addBaddie();
            }

            if (this.checkOverlap(this.man, baddie)){
                this.state.start('GameOver');
                MyGame.finalTime = this.formatTime();
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
    drawDisc: function(){
        this.graphics.clear();
        this.graphics.moveTo(0, 0);
        this.graphics.beginFill(0xCCCCCC);
        this.graphics.arc(0, 0, 189, this.math.degToRad(-90), this.man.rotation - 1.5708, false);
        this.graphics.endFill();
    },
    addBaddie: function(){
        var randomX = this.rnd.integerInRange(0, game.width);
        var randomY = this.rnd.integerInRange(0, game.height);

        var baddie;

        if (this.rnd.integerInRange(1, 2) === 1){
            baddie = this.add.sprite(randomX, Phaser.ArrayUtils.getRandomItem([-15, game.height + 15]), 'baddie');
        } else {
            baddie = this.add.sprite(Phaser.ArrayUtils.getRandomItem([-15, game.width + 15]), randomY, 'baddie');
        }

        baddie.scale.setTo(MyGame.scaleRatio);
        baddie.anchor.set(0.5);
        this.add.tween(baddie).to({x: this.centerX, y: this.centerY}, 2000, Phaser.Easing.Default, true, this.rnd.integerInRange(0, 1000));

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