var PlatformController = pc.createScript('platformController');
PlatformController.attributes.add('gridList', { type: 'entity',array:true });
PlatformController.attributes.add('movementSpeed', { type: 'number',default:1});
PlatformController.attributes.add('destroyingPos', { type: 'number',default:6});
PlatformController.attributes.add('gameManager', { type: 'entity' });
var pause=false;
PlatformController.prototype.initialize = function() {
  this.obstacles=[];
  this.respawnPos=this.gridList[this.gridList.length-1].getLocalPosition().x;
  this.elapsedTime=0;
  $(document).click(function()
  {
      //var app = pc.Application.getApplication();
      //app.timeScale = 0; // This will slow down the game by half
      pause=!pause;
  })
};
PlatformController.prototype.update = function(dt) 
{
    if(pause) return;
    this.elapsedTime += dt;
    this.move(dt);
   
};
PlatformController.prototype.move=function(dt)
{
  if(this.gameManager.script.gameManager.isPause) return;
  for(var i=0;i<this.gridList.length;i++)
  {
      let speed=this.movementSpeed*dt+(this.elapsedTime/150);
      speed=pc.math.clamp(speed, this.movementSpeed*dt, this.movementSpeed*5);
      let x = this.gridList[i].getLocalPosition().x -speed;
      if (x <= this.destroyingPos) 
      {
          x = this.respawnPos+(x-this.destroyingPos);
          this.gridList[i].setLocalPosition(x,this.gridList[i].getLocalPosition().y,this.gridList[i].getLocalPosition().z);
      }
      this.gridList[i].setLocalPosition(x,this.gridList[i].getLocalPosition().y,this.gridList[i].getLocalPosition().z);
  }
}
PlatformController.prototype.getRandom=function(min,max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
PlatformController.prototype.onTriggerEnter = function (entity) {
  if(entity.tags.has('player')) console.log(entity.tags,this.gameManager.script.gameManager.OnPause(true))
  this.app.fire("PlayerController:OnCollisionEnter",entity);
};
pc.Vec3.prototype.distanceTo = function(b) {
	var dx = b.x - this.x;
	var dy = b.y - this.y;
	var dz = b.z - this.z;
	return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
