import React, { useEffect, useState } from 'react';
import { Container, Grid, Button } from '@mui/material';


function TestPage() {

    const [numbers, setNumbers] = useState([]);
    const [numberLimit, setNumberLimit] = useState(36);
    const [bingo,setBingo]= useState([
        {clicked:false,val:'B'},
        {clicked:false,val:'I'},
        {clicked:false,val:'N'},
        {clicked:false,val:'G'},
        {clicked:false,val:'O'}
    ]);

    const[rowRules,setRules] = useState(

        {
            r1:'1-6',
            r2:'7-12',
            r3:'13-18',
            r4:'19-24',
            r5:'25-30',
            r6:'31-36',
        }

    )
    const[columnRules,setColumnRules] = useState(

        {
            r1:'1-7-13-19-25-31',
            r2:'2-8-14-20-26-32',
            r3:'3-9-15-21-27-33',
            r4:'4-10-16-22-28-34',
            r5:'5-11-17-23-29-35',
            r6:'6-12-18-24-30-36',
        }

    )

    const descideAscORDesc = (arry)=>{
        const randomDecimal = Math.random();
        let randomNum = Math.floor(randomDecimal * 10);
                console.log(randomNum)
        if(randomNum > 5) return arry.slice().sort((a, b) => a.val - b.val)
        return arry.slice().sort((a, b) => b.val - a.val)
    }

    const generateRandomNumber = (excludeNumbers) => {
        let randomNumber;
        do {
            const randomDecimal = Math.random();
            randomNumber = Math.floor(randomDecimal * 100) + 1;
        } while (excludeNumbers.some(obj => obj.val === randomNumber));
        return randomNumber;
    };

    const fillTable = (limit) => {
        let tempNumbers = [];
        for (let i = 0; i < limit; i++) {
            const randomNumber = generateRandomNumber(tempNumbers);
            tempNumbers.push({val:randomNumber,clicked:false,bingoSelected:false});
        }
        setNumbers(descideAscORDesc(tempNumbers));
    };

    const fillTableBtnClick = () => {
        fillTable(numberLimit);
    };

    const cellClickedAct = (num)=>{
        console.log(num)
        setNumbers(prevArray => {
            return prevArray.map(item => {
                if (item.val === num) {
                    return { ...item, clicked: !item.clicked };
                }
                return item;
            });
        });
        
    }

    const bingoCellClickedAct = (val)=>{
        
       

        setBingo(prevArray => {
            const updatedArray = prevArray.map(item => {
                if (item.val === val) {
                    return { ...item, clicked: !item.clicked };
                }
                return item;
            });
        
            const clickedCount = updatedArray.filter(item => item.clicked).length;
            if(clickedCount == 5){
                window.alert("Congratulations")
            }
            return updatedArray;
        });
        
    }


    const checkRowRule = ()=>{
        for (const key in rowRules) {
            if (rowRules.hasOwnProperty(key)) {
              //console.log(`${key}: ${rowRules[key]}`);
              let splitedArray = rowRules[key].split('-');
              let selectedCount = 0;
              for(let i= splitedArray[0];i<= splitedArray[1];i++){
                if(numbers[i].clicked == true) selectedCount = selectedCount+1;
              }
              if(selectedCount == 6){
                for(let i= splitedArray[0];i<= splitedArray[1];i++){
                    setNumbers((prevArray) => {
                        return prevArray.map((item, index) => {
                          if (index === i) {
                          
                            return { ...item, bingoSelected: true };
                          }
                          return item;
                        });
                      });
                  }
              }
            }
          }
    }

    //

    useEffect(() => {
      fillTableBtnClick()
    }, [])
    

    return (
        <Grid container height={'100vh'} justifyContent={'center'} alignItems={'center'} bgcolor={'#2E4F4F'}>
            <Grid item lg={12}  >
                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '' }}>
                    <Grid item xs={12} sm={12} lg={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '' }}>
                        <h6 onClick={()=>console.log(numbers)} style={{color:'cyan'}}>NJAAYAKEDU 1.0</h6>
                        <Grid container sx={{ bgcolor: '' }}>
                            {numbers.map((num, index) => (
                                <Grid
                                    onClick={()=>{cellClickedAct(num.val)}}
                                    key={index}
                                    item
                                    xs={2}
                                    sm={2}
                                    lg={2}
                                    sx={{
                                        border: '1px solid black',
                                        height:'40px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        background:num.clicked ? '#2C3333':null,
                                        color:num.clicked ? 'white !important' : null
                                        
                                    }}
                                >
                                    {num.val}
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container sx={{ bgcolor: '',display:'flex',justifyContent:'center' }} mt={2} mb={2}>
                            {bingo.map((x, index) => (
                                <Grid
                                    onClick={()=>{bingoCellClickedAct(x.val)}}
                                    key={index}
                                    item
                                    xs={2}
                                    sm={3}
                                    lg={1}
                                    sx={{
                                        border: '1px solid black',
                                        height:'40px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        background:x.clicked ? 'green':null,
                                        color:x.clicked ? 'white !important' : null
                                    }}
                                >
                                    {x.val}
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={12} lg={12} sx={{ display:'flex', justifyContent:'center'}}>
                                <Button onClick={fillTableBtnClick} children='Fill Table' sx={{color:'white',border:'1px solid cyan'}} />
                              
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default TestPage;
