var Image = React.createclass({
  render: function() {
    return (
      <img src="{this.props.imgSrc}" alt="{this.props.altText}" title="{this.props.titleText}" ClassName="{this.props.class}" />
    )
  }
});