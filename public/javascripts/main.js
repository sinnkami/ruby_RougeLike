var _canvas;
var _context;
var GameManager;
var _Game;
var _Scene;
var _Sprite;
var _Window;

$(function () {
  _canvas = document.getElementById('canvas');
  _context = _canvas.getContext("2d");
  _Game = new GameBase(new GameImage(), new GamePlayer(), new GameEnemy(), new GameKey(), new GameItem(), new GameMap(), new GameSound());
  _Scene = new SceneBase(new SceneDamage(), new SceneItem(), new SceneMenu(), new SceneMove(), new SceneStairs());
  _Sprite = new SpriteBase(new SpriteEnemy(), new SpriteMap(), new SpriteItems(), new SpritePlayer(), new SpriteStairs());
  _Window = new WindowBase(new WindowItem(), new WindowMap(), new WindowLogs(), new WindowHeader(), new WindowMenu(), new WindowQuit(), new WindowStatus());

  GameManager = new Manager(_canvas, _context, _Game, _Scene, _Sprite, _Window);

  GameManager.start();
})