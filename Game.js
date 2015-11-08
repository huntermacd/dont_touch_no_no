MyGame.Game = function(game){
    this.rs = 0;
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

        for (var i = 0; i <= 32; i++) {
            var randomX = this.rnd.integerInRange(0, game.width);
            var randomY = this.rnd.integerInRange(0, game.height);

            var options = [-15, game.width + 15]

            if (this.rnd.integerInRange(1, 2) === 1){
                this.baddies.create(randomX, Phaser.ArrayUtils.getRandomItem(options), 'baddie');
            } else {
                this.baddies.create(Phaser.ArrayUtils.getRandomItem(options), randomY, 'baddie');
            }
        };

        this.baddies.forEach(function(baddie){
            baddie.anchor.set(0.5);
            this.add.tween(baddie).to(
                {x: 300, y: 300}, 2000, Phaser.Easing.Default, true, this.rnd.integerInRange(0, 10000)
            );
        }, this);

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
                baddie.kill();
            }

            if (baddie.alive === false){
                baddie.revive();

                var randomX = this.rnd.integerInRange(0, game.width);
                var randomY = this.rnd.integerInRange(0, game.height);

                var options = [-15, game.width + 15]

                if (this.rnd.integerInRange(1, 2) === 1){
                    baddie.x = randomX;
                    baddie.y = Phaser.ArrayUtils.getRandomItem(options);
                } else {
                    baddie.x = Phaser.ArrayUtils.getRandomItem(options);
                    baddie.y = randomY;
                }

                this.add.tween(baddie).to(
                    {x: 300, y: 300}, 2000, Phaser.Easing.Default, true, this.rnd.integerInRange(0, 10000)
                );
            }
            if (this.checkOverlap(this.man, baddie)){
                this.state.start('GameOver');
            }
        }, this);

        if (this.man.rotation > 6.1 && this.man.rotation < 6.3 || this.man.rotation > 18.7 && this.man.rotation < 18.9){
            this.man.rotation = 12.5664;
            this.rs += 1;
        }

        this.rsText.setText('rotations: ' + this.rs);
    },
    render: function(){
        // this.game.debug.spriteInfo(this.baddie, 32, 32);
    },
    checkOverlap: function(spriteA, spriteB){
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },
    shutdown: function(){
        this.rs = 0;
    }
};