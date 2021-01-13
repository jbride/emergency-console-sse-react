export default
.marker {
  background-size: cover;
  width: 2.5em;
  height: 2.5em;
  border-radius: 40%;
  cursor: pointer;
}
.shelter {
  @extend .marker;
  background-size: contain;
  width: 2.0em;
  height: 2.0em;
  background-image: url('assets/img/circle-shelter-hospital-colored.svg');
  // we could do this with CSS and something like this - vs. the current weird code based way
  // mask: url(assets/img/shelter-hospital.svg) no-repeat center;
  // -webkit-mask: url(assets/img/shelter-hospital.svg) no-repeat center;
  // background-color: rgba(255, 0, 0, 0.5);
}
.incidentMarker {
  @extend .marker;
  background-size: contain;
  width: 2.0em;
  height: 2.0em;
}
.responderMarker {
  @extend .marker;
  background-size: contain;
  width: 2.0em;
  height: 2.0em;
};
