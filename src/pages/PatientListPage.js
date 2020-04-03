import Page from 'components/Page';
import React,{useState} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button} from 'reactstrap';
import DataTable from 'react-data-table-component';
import SendModal from './SendModal';



class TablePage extends React.Component{

  constructor(){
    super();
    this.state={
      data:[
        
      ],
      columns:[
        {
          name: 'firstname',
          selector:'firstname',
          sortable: true,
        },
        {
          name: 'lastname',
          selector:'lastname',
          sortable: true,
        },
        {
          name: 'sex',
          selector:'sex',
          sortable: true,
        },
        {
          name: 'email',
          selector:'email',
          sortable: true,
        },
        {
          name: 'phonenumber',
          selector:'phonenumber',
          sortable: true,
        },
      ],
      tableTypes:['striped'],
      selectedRows:[],
      message:""
    }
    this.handleSend=this.handleSend.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleMessage=this.handleMessage.bind(this);
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_BACKEND_API+'/patient/getlist')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data:responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  

  handleChange = (state) => {
    this.setState({ selectedRows: state.selectedRows }); // triggers MyComponent to re-render with new state
  };

  handleMessage(e){
    this.setState({message:e.target.value});
  }

  handleSend(){
      this.state.selectedRows.map((item,index)=>{

        const jsondata={
          email:item.email,
          message:this.state.message
        }
        fetch(process.env.REACT_APP_BACKEND_API+'/verify/sendNotfication', {
            method: 'POST',
            body: JSON.stringify(jsondata),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              alert('Successfully Sent Email to'+item.email);
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(err => {
            console.error(err);
            alert('Error Sending Email to'+item.email);
          });

      })
  }

  render(){
    const {data,columns,tableTypes}=this.state;
    const handleSend = this.handleSend;
    const handleMessage = this.handleMessage;
    const handleChange = this.handleChange;
    return (
        <Page
          className="DoctorListPage"
        >
          {tableTypes.map((tableType, index) => (
            <Row key={index}>
              <Col>
                <Card className="mb-3">
                  <CardHeader>
                    Patients
                    <SendModal buttonLabel="SEND NOTFICATION" className="SEND_MODAL" handleSend={handleSend} handleMessage={handleMessage}/>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col>
                        <DataTable
                          columns={columns}
                          data={data}
                          striped
                          selectableRows
                          onRowSelected={handleChange}
                        />
                      </Col>

                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ))}

        </Page>
  )};
};

export default TablePage;
