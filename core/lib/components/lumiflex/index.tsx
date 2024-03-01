import styles from './styles.module.css'


interface LumiflexProps {

}

export function Lumiflex(props: LumiflexProps) {

  return (
    <div className={`${styles.gradientCanvas}`} {...props}>
    </div>
  )
}