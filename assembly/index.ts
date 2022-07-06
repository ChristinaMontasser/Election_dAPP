import { PersistentVector, Context} from "near-sdk-as";
import { citizn } from "./models";

@nearBindgen
export class Voting {
  public citiznes: PersistentVector<citizn> = new PersistentVector<citizn>("K");
  T: i32 =0
  B : i32 =0


  notHear(sender: string): bool{
    let flag: bool = 1;
    for(let i: i32=0; i< this.citiznes.length; i++ )
    {
      if(this.citiznes[i].citiznId== sender)
      {
        flag = 0;
        break;
      }
    }
    return flag
  }

  @mutateState()
  voteTrump(): string{
    let message: string = "You've voted once before"
    if(this.notHear(Context.sender))
    {
      this.citiznes.push(new citizn("Trump", Context.sender))
      this.T+=1
      message = "Vote is done"
    }
    return message
  }

  @mutateState()
  voteBiden(): string{
    let message: string ="You've voted once before"
    if(this.notHear(Context.sender))
    {
      this.citiznes.push(new citizn("Biden", Context.sender))
      this.B+=1
      message = "Vote is done"
    }
    return message
  }

  viewVoting(): Array<citizn>
  {
    let vote :Array<citizn> = new Array <citizn>(this.citiznes.length)
    for(let i: i32=0; i< this.citiznes.length; i++ )
    {
      vote[i]= this.citiznes[i]
    }
    return vote
  }

  Trump(): i32{
    return this.T
  }
  Biden(): i32{
    return this.B
  }
}
