class Manager {
  constructor(canvas, context, game, scene, sprite, window, $window) {
    this.game = game;
    this.canvas = canvas;
    this.context = context;
    this.scene = scene;
    this.sprite = sprite;
    this.window = window;

    this.$window = $window;

    this.mainInterval;
    this.menuInterval;

    this.FPS = 30;
  }


  GameStart() {
    this.game.play = true;

    this.game.image.init();

    this.game.key.init();

    this.scene.move.init();
    this.game.player.init();

    this.init();
  }

  init() {
    this.mapCreate();
    this.startInterval();
  }

  startInterval() {
    this.mainInterval = setInterval(() => {
      this.window.map.draw();
      this.window.statusBar.draw();

      this.game.key.event();
      this.scene.move.event();

      this.sprite.player.draw();
      for (var i = 0; i < this.game.enemes.length; i++){
        this.sprite.enemy.draw(this.game.enemes[i]);
      }
      if (this.scene.stairs.hereStairs() && this.game.key.input.enter){
        this.game.key.input.enter = false;
        this.scene.stairs.down();
      }else if (!this.scene.damage.execution.player && !this.scene.damage.execution.enemy && this.game.key.input.enter){
        this.game.key.input.enter = false;
        this.scene.damage.attack();
      }
      // デバッグ用 =begin

      if (!this.game.miniMap.invalidation) {
        for (var y = 0; y < this.game.miniMap.data.length; y++){
          for (var x = 0; x < this.game.miniMap.data.length; x++){
            if (this.game.miniMap.data[y][x] != this.game.map.number.wall){
              this.context.fillStyle = "green";
              this.context.fillRect(this.window.x + 20 + x*5, this.window.y + 70 + y*5, 5, 5);
            }
          }
        }
      }
      // =end
    }, 1000/this.FPS);
  }

  stopInterval() {
    clearInterval(this.mainInterval);
  }

  mapCreate() {
    this.context.setTransform(1,0,0,1,0,0);
    this.window.x = 0;
    this.window.y = 0;

    this.game.hierarchy++;

    this.game.enemes = [];
    this.game.map.create();

    this.game.miniMap.init();

    this.window.map.init();
    this.window.map.draw();

    this.game.miniMap.firstMapping()
  }

  wait(flag, property, true_or_false, callback){
    var self = setInterval(() => {
      if (flag[property] == true_or_false) {
        clearInterval(self);
        callback();
        return;
      }
    }, 1000/this.FPS);
  }
}
