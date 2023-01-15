import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon, ExclamationCircleIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

export default function Icon(props: { 
  size: number,
  name: 'play'|'pause'|'forward'|'backward'|'exclamation'|'heart'|'heart-[solid]'
}) {
  let Component: any

  switch (props.name) {
    case 'play': Component = PlayIcon; break;
    case 'pause': Component = PauseIcon; break;
    case 'backward': Component = BackwardIcon; break;
    case 'forward': Component = ForwardIcon; break;
    case 'exclamation': Component = ExclamationCircleIcon; break;
    case 'heart': Component = HeartIcon; break;
    case 'heart-[solid]': Component = HeartIconSolid; break;
  }

  return <Component  style={{ width: `${props.size}rem`, height: `${props.size}rem` }} />
}