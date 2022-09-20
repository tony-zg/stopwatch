import { useDispatch } from 'react-redux';
import { deleteLap } from '../features/lapSlice';
import { displayNum } from '../helper/DisplayNum';
import { MdDeleteForever } from 'react-icons/md';

interface LapCardType {
  id: number;
  minute: number;
  second: number;
  millisecond: number;
}

const LapCard = ({ id, minute, second, millisecond }: LapCardType) => {
  const dispatch = useDispatch();

  return (
    <p className="lap__inner__container" key={id}>
      <span className="lap__id">lap {id + 1}</span>
      {minute > 0 ? displayNum(minute) + ' : ' : null}
      {displayNum(second)}.
      <span className="millsecond">{displayNum(millisecond)}</span>
      <span className="delete_btn__container">
        <MdDeleteForever
          size={26}
          className="delete__btn"
          onClick={() => dispatch(deleteLap(id))}
        />
      </span>
    </p>
  );
};

export default LapCard;
