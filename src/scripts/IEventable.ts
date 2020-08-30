export default interface IEventable {
  on(event: string, callback: Function): void;

  onOnce(event: string, callback: Function): void;

  onPromise(event: string): Promise<any>;
  /**
   * Remove listener on event
   *
   * @param {String} event
   * @param {function()} callback
   * @returns {Boolean}
   *
   * @memberOf Eventable
   */
  off(event: string, callback: Function): Boolean;
}
