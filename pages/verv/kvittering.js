function Kvittering () {
  return (
    <div>
      Tusen takk for at du har vervet.
      <button onClick={() => window.location.reload()}>
        Jeg vil verve flere
      </button>
    </div>
  )
}

export default Kvittering
