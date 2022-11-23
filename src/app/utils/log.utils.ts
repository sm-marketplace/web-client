// 'background: #222; color: #bada55'

export class LOG {
  
  // danger success warning info 
  // #bb2124	(187,33,36)
  // #22bb33	(34,187,51)
  // #f0ad4e	(240,173,78)
  // #5bc0de	(91,192,222)
  // #aaaaaa
  private static getColor(type: 'success' | 'error' | 'warning' | 'info') {
    switch (type) {
      case 'error': return '#bb2124';
      case 'success': return '#22bb33';
      case 'warning': return '#f0ad4e';
      case 'info': return '#5bc0de';
    }
  }

  static msg(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    
    const msg = message + ' | ' + type;
    const color = this.getColor(type);

    console.log(`%c ${msg}`, `background: black; color: ${color}; font-weight: bolder`);
  }

}
