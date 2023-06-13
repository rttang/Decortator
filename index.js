// function decoratorLogTime(target, key) {
//   const targetPrototype = target.prototype;
//   const oldDescriptor = Object.getOwnPropertyDescriptor(targetPrototype, key);

//   const logTime = function (...arg) {
//     let start = +new Date();
//     try {
//       return oldDescriptor.value.apply(this, arg);
//     } finally {
//       let end = +new Date();
//       console.log(`耗时：${end - start}ms`);
//     }
//   };
//   Object.defineProperty(targetPrototype, key, {
//     ...oldDescriptor,
//     value: logTime,
//   });
// }
// class GuanYu {
//   attack() {
//     console.log('挥砍了一次大刀');
//   }
//   run() {
//     console.log('跑了一段距离');
//   }
// }
// decoratorLogTime(GuanYu, 'attack');
// decoratorLogTime(GuanYu, 'run');

// const guanYu = new GuanYu();
// guanYu.attack();
// guanYu.run();
function logTime(target,key,descriptor){
  const oldMethod = descriptor.value
  const logTime = function(..arg){
    let start = +new Date()
    try{
      return oldMethod.apply(this,arg)

    }finally{
      let end = +new Date()
      console.log(`耗时：${end-start}ms`)
    }
  }
  descriptor.value = logTime
  return descriptor
}

class GuanYu {
  @logTime
  attack() {
    console.log('挥砍了一次大刀');
  }
  @logTime
  run() {
    console.log('跑了一段距离');
  }
}