import { PersistentVector, Context} from "near-sdk-as";
import { citizen } from "./models";

@nearBindgen
export class Voting {
  public citiznes: PersistentVector<citizen> = new PersistentVector<citizen>("K");
  T: i32 =0
  B : i32 =0


  notHere(sender: string): bool{
    let flag: bool = 1;
    for(let i: i32=0; i< this.citiznes.length; i++ )
    {
      if(this.citiznes[i].citizenId== sender)
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
    if(this.notHere(Context.sender))
    {
      this.citiznes.push(new citizen("Trump", Context.sender))
      this.T+=1
      message = "Vote is done"
    }
    return message
  }

  @mutateState()
  voteBiden(): string{
    let message: string ="You've voted once before"
    if(this.notHere(Context.sender))
    {
      this.citiznes.push(new citizen("Biden", Context.sender))
      this.B+=1
      message = "Vote is done"
    }
    return message
  }

  viewVoting(): Array<citizen>
  {
    let vote :Array<citizen> = new Array <citizen>(this.citiznes.length)
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