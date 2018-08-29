class Cacher {
  static cache(name, obj){
    localStorage.setItem(name, JSON.stringify(obj));
  }

  static retrieveItem(name){
    return JSON.parse(localStorage.getItem(name));
  }

  static wipeItem(name){
    localStorage.removeItem(name);
  }

  static hasItem(name){
    return localStorage.getItem(name)!=null;
  }
}

export default Cacher;
