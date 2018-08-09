export class Session {

  public name: string;
  public record_date: string;
  public session_type: string;
  public ts: [string];
  public force_raw: [any];
  public angle_raw: [any];
  public force_adj: [any];
  public angle_adj: [any];

  constructor(
    name,
    record_date,
    session_type,
    ts,
    force_raw,
    angle_raw,
    force_adj,
    angle_adj
  ) { }
  
}