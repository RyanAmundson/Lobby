export function WriteToFeed(): ClassDecorator {
  return (constructor: any) => {
    // You can add/remove events for your needs
    const component = constructor.name;
    console.log(constructor.prototype);
    for (let method in constructor.prototype) {
      console.log(method)
      let original = constructor.prototype[method];
      constructor.prototype[method] = (...args) => {
        console.log(component, method, ...args);
        original.apply(args[0], args);
      };
    }
  };
}
