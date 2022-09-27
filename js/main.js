$(function () {
    var _width = window.innerWidth;
    var _height = window.innerHeight;
    var type=_height/_width;
        if(type<1.5){
            _width=300;
            _height=532.5;
            $("#game")[0].style.cssText="width:320px;height:568px;margin:50px auto;";
        }
    var unit = 1080 / _width;
    var dheight = window.screen.availHeight - document.documentElement.clientHeight;
    var game = new Phaser.Game(_width,_height, Phaser.CANVAS,'game')
    game.MyStates = {};
    var bgm, clickbgm;
    var isStop = true;
    var level = 0
    var getArr = ['get_00', 'get_01', 'get_02', 'get_03', 'get_04', 'get_05', 'get_06', 'get_07', 'get_08', 'get_09', 'get_10', 'get_11', 'get_12', 'get_13', 'get_14', 'get_15', 'get_16', 'get_17', 'get_18', 'get_19'];
    var loseArr = ['lose_00', 'lose_01', 'lose_02', 'lose_03', 'lose_04', 'lose_05', 'lose_06', 'lose_07', 'lose_08', 'lose_09', 'lose_10', 'lose_11', 'lose_12', 'lose_13', 'lose_14', 'lose_15', 'lose_16', 'lose_17', 'lose_18', 'lose_19', 'lose_20', 'lose_21', 'lose_22', 'lose_23', 'lose_24', 'lose_25', 'lose_26', 'lose_27', 'lose_28', 'lose_29', 'lose_30', 'lose_31', 'lose_32', 'lose_33', 'lose_34', 'lose_35', 'lose_36'];
    
        // 天降之物
        function Drop(config) {
            this.init = function () {
                this.drops = game.add.group();
                this.drops.enableBody = true;
                this.drops.scale.set(1 / unit);
                this.drops.createMultiple(config.makeCount, config.selfPic);
                this.drops.setAll('body.width', 100 / unit);
                this.drops.setAll('body.height', 100 / unit);
                this.drops.setAll('outOfBoundsKill', true);
                this.drops.setAll('checkWorldBounds', true);
                this.maxWidth = (game.width - 115 / unit) * unit;
                this.loopevent = game.time.events.loop(Phaser.Timer.SECOND * config.selfTimeInterval, this.generateDrop, this);
            };
            this.generateDrop = function () {
                var e = this.drops.getFirstExists(false);
                if (e) {
                    e.reset(game.rnd.integerInRange(0, this.maxWidth), -game.cache.getImage(config.selfPic).height);
                    e.body.velocity.y = (config.velocity + level)*1.1;
                    e.body.acceleration.y = config.acceleration;
                }
            };
        }
    game.MyStates.boot = {
        init:function(){
                game.scale.pagesAlignHorizontally = true;
                game.scale.pageAlignVertically = true;
                // game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                game.musicPause = false;
        },
        preload:function(){
            game.load.image('loadbg', 'assets/images/loadbg.jpg');
            game.load.image('loadword', 'assets/images/loadword.png');
            game.load.image('progress', 'assets/images/progress.png');
            game.load.image('progressBar', 'assets/images/progressBar.png');
        },
        create:function(){
            game.state.start('load');
        }
    }
    game.MyStates.load = {
        init: function () {
                this.bg = game.add.sprite(0, 0, 'loadbg');
                this.bg.width = _width;
                this.bg.height = _height + dheight;
            },
        preload:function(){
                //进度条
                this.progress = game.add.sprite(_width / 2, 587 / unit, 'progress');
                this.progress.anchor.set(0.5, 0);
                this.progress.width = 892 / unit;
                this.progress.height = 278 / unit;
                this.progressBar = game.add.sprite(109 / unit, 794 / unit, 'progressBar');
                this.progressBar.anchor.set(0, 0);
                this.progressBar.width = 0 / unit;
                this.progressBar.height = 60 / unit;
                var tween = game.add.tween(this.progressBar);
                this.loadword = game.add.sprite(_width / 2, 804 / unit, 'loadword');
                this.loadword.anchor.set(0.5, 0);
                this.loadword.width = 193 / unit;
                this.loadword.height = 40 / unit;
                //加载资源
                game.load.spritesheet('voice', 'assets/images/voice.png', 105, 105, 2);
                game.load.atlas('cat', 'assets/images/cat.png', 'assets/images/cat.json');
    
    
                game.load.image('ground', 'assets/images/ground.jpg');
                game.load.image('title', 'assets/images/title.png');
                game.load.image('startBtn', 'assets/images/startBtn.png');
                game.load.image('help', 'assets/images/help.png');
                game.load.image('popup', 'assets/images/popup.png');
                game.load.image('comb', 'assets/images/comb.png');
                game.load.image('ham', 'assets/images/ham.png');
                game.load.image('milk', 'assets/images/milk.png');
                game.load.image('egg', 'assets/images/egg.png');
                game.load.image('carrot', 'assets/images/carrot.png');
                game.load.image('can', 'assets/images/can.png');
    
    
                game.load.image('boom', 'assets/images/boom.png');
                game.load.image('scorebox', 'assets/images/scorebox.png');
                game.load.image('score', 'assets/images/score.png');
                game.load.image('overbox', 'assets/images/overbox.png');
                game.load.image('overscore', 'assets/images/overnum.png');
                game.load.image('again', 'assets/images/again.png');
                game.load.image('link', 'assets/images/link.png');
    
                game.load.audio('bgm', 'assets/audio/bgm.mp3', true);
                game.load.audio('boom', 'assets/audio/boom.mp3', true);
                game.load.audio('click', 'assets/audio/button.mp3', true);
                game.load.audio('get', 'assets/audio/get.mp3', true);
                game.load.audio('lose', 'assets/audio/lose.mp3', true);
    
                game.load.onLoadComplete.add(function () {
                    game.sound.setDecodedCallback(['bgm', 'boom', 'click', 'get', 'lose'], function () {
                        tween.to({
                            width: 861 / unit
                        }, 800, null, true);
                        setTimeout(function () {
                            console.log('准备开始了哦')
                            game.state.start('start');
                        }, 1500);
                    }, this);
                });
        },
    }
    game.MyStates.start = {
        create:function(){
            game.bgmControl = function () {
                game.musicPause ? (game.musicPause = false, this.voiceBtn.frame = 1, bgm.play()) : (game.musicPause = true, this.voiceBtn.frame = 0, bgm.stop());
            };
            // 背景
            this.bg = game.add.sprite(0, 0, 'loadbg');
            this.bg.width = _width;
            this.bg.height = _height + dheight;
            // 地面
            this.ground = game.add.sprite(0, game.height, 'ground');
            this.ground.anchor.set(0, 1);
            this.ground.width = game.width;
            this.ground.height = 195 / unit;
            // 标题
            var title = game.add.image(36 / unit, 211 / unit, 'title');
            title.width = 1020 / unit;
            title.height = 523 / unit;
            // 开始游戏
            this.startGame = game.add.button(393 / unit, 846 / unit, 'startBtn', this.startGame, this);
            this.startGame.width = 309 / unit;
            this.startGame.height = 311 / unit;
            // 音乐控制
            bgm = game.add.sound('bgm', 0.5, true);
            bgm.play();
            this.voiceBtn = game.add.sprite(923 / unit, 45 / unit, 'voice', 1);            this.voiceBtn.width = 105 / unit;
            this.voiceBtn.height = 105 / unit;
            this.voiceBtn.inputEnabled = true;
            this.voiceBtn.events.onInputDown.add(game.bgmControl, this);
            //猫猫
            this.bang = game.add.sprite(game.world.centerX, game.height - 178 / unit, 'cat');
            this.bang.anchor.set(0.5, 1);
            this.bang.width = 260 / unit;
            this.bang.height = 260 / unit;
            this.bang.animations.add('run');
            this.bang.animations.play('run', 2, true);
            //鸡冠
            this.comb1 = game.add.sprite(138 / unit, 1428 / unit, 'comb');
            this.comb1.width = 137 / unit;
            this.comb1.height = 157 / unit;
            this.comb1.rotation = 1.5 * Math.PI;
            var updown1 = this.add.tween(this.comb1);
            updown1.to({
                top: 1350 / unit
            }, 500, Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true);
            this.comb2 = game.add.sprite(825 / unit, 1347 / unit, 'comb');
            this.comb2.width = 137 / unit;
            this.comb2.height = 157 / unit;
            var updown2 = this.add.tween(this.comb2);
            updown2.to({
                top: 1250 / unit
            }, 700, Phaser.Easing.Quadratic.InOut, true, 300, Number.MAX_VALUE, true);
            //帮助信息
            this.helpBtn = game.add.button(game.width, 912 / unit, 'help', this.showHelp, this);
            this.helpBtn.anchor.set(1, 0);
            this.helpBtn.width = 86 / unit;
            this.helpBtn.height = 238 / unit;
            this.helpPopup = game.add.image(118 / unit, 798 / unit, 'popup');
            this.helpPopup.width = 835 / unit;
            this.helpPopup.height = 513 / unit;
            this.helpPopup.inputEnabled = true;
            this.helpPopup.events.onInputDown.add(this.closeHelp, this);
            this.helpPopup.visible = false;
        },
        closeHelp:function () {
            this.helpPopup.visible = false;
        },
        showHelp:function () {
            this.helpPopup.visible = true;
        },
        startGame : function () {
            clickbgm = game.add.audio('click', 0.5, false);
            clickbgm.play();
            setTimeout(function () {
                game.state.start('gameState');
            }, 1000);
        },
    }
    game.MyStates.gameState = {
        create: function () {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            // 背景
            this.bg = game.add.sprite(0, 0, 'loadbg');
            this.bg.width = _width;
                this.bg.height = _height + dheight;
                // 地面
                this.ground = game.add.sprite(0, game.height, 'ground');
                this.ground.anchor.set(0, 1);
                this.ground.width = game.width;
                this.ground.height = 195 / unit;
                game.physics.arcade.enable(this.ground);
    
                //猫咪
                console.log('猫咪1')
                this.bang = game.add.sprite(game.world.centerX, game.height - 178 / unit, 'cat');
                console.log('猫咪2')
    
                this.bang.anchor.set(0.5, 1);
                this.bang.width = 260 / unit;
                this.bang.height = 260 / unit;
                this.bang.animations.add('bangrun');
                this.bang.animations.add('bangget', getArr);
                this.bang.animations.add('banglose', loseArr);
                console.log('猫咪4')
    
                this.bang.animations.play('bangrun', 2, true);
                console.log('猫咪5')
    
                game.physics.arcade.enable(this.bang);
                this.bang.body.width = 220 / unit;
                this.bang.body.height = 260 / unit;
                this.bang.body.offset.set(20 / unit, 20 / unit);
                this.bang.body.collideWorldBounds = true;
                console.log('猫咪3')
    
                this.onStart();
                //音乐控制
                this.voiceBtn = game.add.sprite(923 / unit, 45 / unit, 'voice', 1);
                this.voiceBtn.width = 105 / unit;
                this.voiceBtn.height = 105 / unit;
                this.voiceBtn.inputEnabled = true;
                this.voiceBtn.events.onInputDown.add(game.bgmControl, this);
                //分数
                this.showScore = game.add.sprite();
                this.scoreBox = game.add.sprite(25 / unit, 20 / unit, 'scorebox');
                this.scoreBox.width = 525 / unit;
                this.scoreBox.height = 157 / unit;
                this.showScore.addChild(this.scoreBox);
                this.score = game.add.retroFont('score', 32, 62, "0123456789", 10, 0, 0);
                this.score.setFixedWidth(320, Phaser.RetroFont.ALIGN_RIGHT);
                this.score.text = "0";
                this.num = game.add.image(200 / unit, 86 / unit, this.score);
                this.num.scale.set(1 / unit);
                this.showScore.addChild(this.num);
                this.showScore.bringToTop();
                //音效
                this.getbgm = game.add.audio('get', 0.2, false);
                this.boombgm = game.add.audio('boom', 0.2, false);
                this.losebgm = game.add.audio('lose', 0.2, false);
    
                //游戏结束弹窗
                this.overPopup = game.add.group();
                this.overBox = game.add.image(46 / unit, 321 / unit, 'overbox');
                this.overBox.width = 989 / unit;
                this.overBox.height = 1068 / unit;
                this.overPopup.add(this.overBox);
                this.overscore = game.add.retroFont('overscore', 32, 62, "0123456789", 10, 0, 0);
                this.overnum = game.add.image(603 / unit, 564 / unit, this.overscore);
                this.overnum.scale.set(1 / unit);
                this.overPopup.add(this.overnum);
                this.againBtn = game.add.button(315 / unit, 695 / unit, 'again', function () {
                    this.losebgm.stop();
                    clickbgm.play();
                    setTimeout(function () {
                        game.state.start('gameState');
                        if (!game.musicPause) {
                            bgm.play();
                        }
                    }, 1000);
                }, this);
                this.againBtn.width = 477 / unit;
                this.againBtn.height = 163 / unit;
                this.overPopup.add(this.againBtn);
                this.overPopup.visible = false;
    
        },
        onStart:function () {
                isStop = false;
                level = 0;
                game.time.events.start();
                console.log('游戏开始了')
                //游戏开始
                this.bang.inputEnabled = true;
                this.bang.input.enableDrag(false);
                this.bang.input.allowVerticalDrag = false;
                this.scorecount = 0;
                //设置下落物参数
                var drop = {
                    dropcomb: {
                        game: this,
                        selfPic: "comb",
                        makeCount: 2,
                        velocity: 100,
                        acceleration: 100,
                        angularVelocity: 0,
                        selfTimeInterval: 0.4
                    },
                    dropham: {
                        game: this,
                        selfPic: "ham",
                        makeCount: 1,
                        velocity: 50,
                        acceleration: 100,
                        angularVelocity: 0,
                        selfTimeInterval: 0.4
                    },
                    dropmilk: {
                        game: this,
                        selfPic: "milk",
                        makeCount: 1,
                        velocity: 170,
                        acceleration: 100,
                        angularVelocity: 0,
                        selfTimeInterval: 0.4
                    },
                    dropegg: {
                        game: this,
                        selfPic: "egg",
                        makeCount: 1,
                        velocity: 270,
                        acceleration: 100,
                        angularVelocity: 0,
                        selfTimeInterval: 0.4
                    },
                    dropcan: {
                        game: this,
                        selfPic: "can",
                        makeCount: 1,
                        velocity: 90,
                        acceleration: 100,
                        angularVelocity: 0,
                        selfTimeInterval: 0.4
                    },
                    dropcarrot: {
                        game: this,
                        selfPic: "carrot",
                        makeCount: 1,
                        velocity: 220,
                        acceleration: 100,
                        angularVelocity: 0,
                        selfTimeInterval: 0.4
                    },
                    dropboom: {
                        game: this,
                        selfPic: "boom",
                        makeCount: 1,
                        velocity: 350,
                        acceleration: 100,
                        angularVelocity: 50,
                        selfTimeInterval: 0.9
                    }
                };
                this.acomb = new Drop(drop.dropcomb);
                this.acomb.init();
                this.acarrot = new Drop(drop.dropcarrot);
                this.acarrot.init();
                this.aham = new Drop(drop.dropham);
                this.aham.init();
                this.aegg = new Drop(drop.dropegg);
                this.aegg.init();
                this.acan = new Drop(drop.dropcan);
                this.acan.init();
                this.amilk = new Drop(drop.dropmilk);
                this.amilk.init();
                this.aboom = new Drop(drop.dropboom);
                this.aboom.init();
                this.aboom.drops.forEach(function (drop) { 
                    drop.animations.add("fire");
                    drop.animations.play("fire",20,true);
                 });
        },
        showOverPopup: function () {
            var _this = this;
            bgm.stop();
            setTimeout(function () {
                _this.overPopup.visible = true;
                _this.losebgm.play();
            }, 1000);
        },
        stopGame : function () {
            isStop = true;
            this.bang.inputEnabled = false;
            game.time.events.stop(false);
            this.acomb.drops.setAll('body.velocity.y', 0);
            this.acomb.drops.setAll('body.acceleration.y', 0);
            this.acarrot.drops.setAll('body.velocity.y', 0);
            this.acarrot.drops.setAll('body.acceleration.y', 0);
            this.aham.drops.setAll('body.velocity.y', 0);
            this.aham.drops.setAll('body.acceleration.y', 0);
            this.aegg.drops.setAll('body.velocity.y', 0);
            this.aegg.drops.setAll('body.acceleration.y', 0);
            this.acan.drops.setAll('body.velocity.y', 0);
            this.acan.drops.setAll('body.acceleration.y', 0);
            this.amilk.drops.setAll('body.velocity.y', 0);
            this.amilk.drops.setAll('body.acceleration.y', 0);
            this.aboom.drops.setAll('body.velocity.y', 0);
            this.aboom.drops.setAll('body.acceleration.y', 0);
            this.bang.animations.currentAnim.stop();
            this.bang.y = game.height - 95 / unit;
            this.showOverPopup();
            this.overscore.text = "" + this.scorecount;
        },
        setLevel : function () {
            switch (this.scorecount) {
                case 10000:
                    level = 50;
                    break;
                 case 50000:
                    level = 100;
                    this.acomb.loopevent.delay = 300;
                    this.aham.loopevent.delay = 300;
                    this.acarrot.loopevent.delay = 300;
                    this.acan.loopevent.delay = 300;
    
    
                    this.aboom.loopevent.delay = 800;
                    this.amilk.loopevent.delay = 800;
                    this.aegg.loopevent.delay = 800;
    
                    break;
                case 100000:
                    level = 200;
                    this.acomb.loopevent.delay = 250;
                    this.aham.loopevent.delay = 250;
                    this.acarrot.loopevent.delay = 250;
                    this.acan.loopevent.delay = 250;
    
    
                    this.aboom.loopevent.delay = 600;
                    this.amilk.loopevent.delay = 600;
                    this.aegg.loopevent.delay = 600;
    
                    break;
                case 200000:
                    level = 250;
                    this.acomb.loopevent.delay = 200;
                    this.aham.loopevent.delay = 200;
                    this.acarrot.loopevent.delay = 200;
                    this.acan.loopevent.delay = 200;
    
    
                    this.aboom.loopevent.delay = 400;
                    this.amilk.loopevent.delay = 400;
                    this.aegg.loopevent.delay = 400;
    
                    break;
                case 300000:
                    level = 300;
                    this.acomb.loopevent.delay = 200;
                    this.aham.loopevent.delay = 200;
                    this.acarrot.loopevent.delay = 200;
                    this.acan.loopevent.delay = 200;
    
    
                    this.aboom.loopevent.delay = 300;
                    this.amilk.loopevent.delay = 300;
                    this.aegg.loopevent.delay = 300;
    
                    break;
            }
        },
        crashDrops : function (bang, drop) {
            console.log('drop',drop)
            if (!isStop && drop.key === "comb") {
                drop.kill();
                this.bang.animations.currentAnim.stop();
                this.getbgm.play();
                this.bang.body.offset.set(40 / unit, 230 / unit);
                this.scorecount += 1000;
                this.setLevel();
            }else if(!isStop && drop.key === "ham"){
                drop.kill();
                this.bang.animations.currentAnim.stop();
                this.getbgm.play();
                this.bang.body.offset.set(40 / unit, 230 / unit);
                this.scorecount += 1000;
                this.setLevel();
            }else if(!isStop && drop.key === "carrot"){
                drop.kill();
                this.bang.animations.currentAnim.stop();
                this.getbgm.play();
                this.bang.body.offset.set(40 / unit, 230 / unit);
                this.scorecount += 1000;
                this.setLevel();
            }else if(!isStop && drop.key === "can"){
                drop.kill();
                this.bang.animations.currentAnim.stop();
                this.getbgm.play();
                this.bang.body.offset.set(40 / unit, 230 / unit);
                this.scorecount += 1000;
                this.setLevel();
            }else {
                drop.kill();
                this.getbgm.stop();
                this.boombgm.play();
                this.stopGame();
            }
        },
        update:function () {
            this.acomb && game.physics.arcade.overlap(this.acomb.drops, this.bang, this.crashDrops, null, this);
            this.aboom && game.physics.arcade.overlap(this.aboom.drops, this.bang, this.crashDrops, null, this);
            this.acan && game.physics.arcade.overlap(this.acan.drops, this.bang, this.crashDrops, null, this);
    
            this.aham && game.physics.arcade.overlap(this.aham.drops, this.bang, this.crashDrops, null, this);
            this.acarrot && game.physics.arcade.overlap(this.acarrot.drops, this.bang, this.crashDrops, null, this);
            this.amilk && game.physics.arcade.overlap(this.amilk.drops, this.bang, this.crashDrops, null, this);
            this.aegg && game.physics.arcade.overlap(this.aegg.drops, this.bang, this.crashDrops, null, this);
    
    
    
            if (!isStop && this.bang.animations.currentAnim.isFinished) {
                this.bang.animations.play('bangrun', 20, true);
            }
            this.score.text = "" + this.scorecount;
        }
    };
    game.state.add('boot',game.MyStates.boot);
    game.state.add('load',game.MyStates.load);
    game.state.add('start',game.MyStates.start);
    game.state.add('gameState', game.MyStates.gameState);
    
    game.state.start('boot');
    });