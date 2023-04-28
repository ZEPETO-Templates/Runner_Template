import { ZepetoScriptBehaviour } from 'ZEPETO.Script';

export default class PointsManager extends ZepetoScriptBehaviour {
  // Define a private variable to hold the unique instance of the class
  private static instance: PointsManager;

  // Define a private variable to store the points
  private _Points: number = 0;

  // Define a static method that returns the unique instance of the class
  public static getInstance(): PointsManager {

    // If the instance has not been created, create a new instance and return it
    if (!PointsManager.instance) {
      PointsManager.instance = new PointsManager();
      return PointsManager.instance;
    } else {

      // If the instance has already been created, return the existing instance
      return this.instance;
    }
  }

  // Define a public method that updates the amount of points scored
  public ScorePoints(points: number): void {
    this._Points += points;
  }

  // Define a public method that returns the amount of points scored
  public GetPoints(): number {
    return this._Points;
  }

   public ResetPoints(): void {
    this._Points=0;
  }
}

