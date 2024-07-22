class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let results = [];
      for (let command of message.commands) {
         let result = { completed: true };

         if (command.commandType === 'STATUS_CHECK') {
            result.roverStatus = {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position
            };

         } else if (command.commandType === 'MODE_CHANGE') {
            this.mode = command.value;
         } else if (command.commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               result.completed = false;
            } else {
               this.position = command.value;
            }
         }

         results.push(result);

      }
      return {
         message: message.name,
         results: results
      };

   }


}


module.exports = Rover;