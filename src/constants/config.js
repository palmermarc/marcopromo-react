const config = {
  apiBase: 'http://marcopromo.api/',
  awsBucket: '',
  version: '3.0.0 BETA',
  statuses: {
    copies : {
      "draft" : {
        "label" : "Draft",
        "color" : "#FFF9C4"
      },
      "pending" : {
        "label" : "Pending",
        "color" : "#E8EAF6"
      },
      "active" : {
        "label" : "Active",
        "color" : "#F1F8E9"
      },
      "inactive" : {
        "label" : "Completed",
        "color" : "#EF9A9A"
      }
    }
  },
  fields: {
    copies : {
      name : {
        "type" : "text",
        "label" : "Copy Name",
        "required" : false,
        "placeholder" : "Enter the Copy Name"
      },
      content : {
        "type" : "wysiwyg",
        "label" : "Content",
        "required" : true,
        "placeholder" : "Copy Goes Here"
      },
      instructions : {
        "type" : "wysiwyg",
        "label" : "Content",
        "required" : false,
        "placeholder" : "Enter any on-air instructions here..."
      },
      start_date : {
        "type" : "date",
        "label" : "Start Date",
        "required" : true,
        "placeholder" : "",
      },
      end_date : {
        "type" : "date",
        "label" : "End Date",
        "required" : true,
        "placeholder" : "",
      },
      station : {
        "type" : "select",
        "label" : "Station",
        "placeholder" : "Select a Station...",
        "required" : true,
        options : {
          "1" : "Station 1",
          "2" : "Station 2",
          "3" : "Station 3",
          "4" : "Station 4",
        }
      },
      copy_type : {
        "type" : "select",
        "label" : "Copy Type",
        "placeholder" : "Select a Copy Type...",
        "required" : true,
        options : {
          "1" : "Copy Type 1",
          "2" : "Copy Type 2",
          "3" : "Copy Type 3",
          "4" : "Copy Type 4",
        }
      }
    }
  }
}

export default config;

