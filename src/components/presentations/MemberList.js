import React from 'react'
import {Divider} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import HotTable from 'react-handsontable'
import { Link } from 'react-router-dom'

const MemberList = ({show_hided_issue, issue_rows, selected_group_id, selected_year, current_id, group_users, assigned_projectlist_open, selected_member,
                    onoffAssignedProjectList, setSelectedMember
                  }) => {

  const rowData1 = (issue_rows, group_users) => {
    const sum_rows = issue_rows.reduce((result, current) => {
      let element = result.filter((p) => p.assigned_id === current.assigned_id)
      if (element.length === 0) {
        // 読み込んだチケットの担当者に紐付く集計レコードが存在しない場合
        // 集計レコードを新たに作成する
        const grade = group_users.filter(group_users => group_users.id === current.assigned_id)[0] ?
                        group_users.filter(group_users => group_users.id === current.assigned_id)[0].grade : ""
        const category = grade.substring(0,1) === 'G' || grade.substring(0,1) === 'M' ? 'プロパー' : 'BP'
        result.push({
          grade: grade,
          category: category,
          assigned_name: '<Link to={/issue_edit/${' + current.assigned_id + '}}>' + current.assigned_name + '</Link>',
          ...current
        })
      } else {
        // 読み込んだチケットの担当者に紐付く集計レコードが存在する場合
        // 既存の集計レコードに読み込んだチケットの見積工数を加算する
        element[0].es04 += current.es04
        element[0].es05 += current.es05
        element[0].es06 += current.es06
        element[0].es07 += current.es07
        element[0].es08 += current.es08
        element[0].es09 += current.es09
        element[0].es10 += current.es10
        element[0].es11 += current.es11
        element[0].es12 += current.es12
        element[0].es01 += current.es01
        element[0].es02 += current.es02
        element[0].es03 += current.es03
      }
      return result
    },[])
    return sum_rows
  }

  const rowData2 = (issue_rows, selected_member) => {
    const assigned_projects = issue_rows.filter(issue_row => issue_row.assigned_id === selected_member)

    const sum_rows = assigned_projects.reduce((result, current) => {
      let element = result
      if (element.length === 0) {
        result.push({...current})
        result[0].assigned_id = "集計"
        result[0].assigned_name = "-"
        result[0].title = "-  "
      } else {
        element[0].es04 += current.es04
        element[0].es05 += current.es05
        element[0].es06 += current.es06
        element[0].es07 += current.es07
        element[0].es08 += current.es08
        element[0].es09 += current.es09
        element[0].es10 += current.es10
        element[0].es11 += current.es11
        element[0].es12 += current.es12
        element[0].es01 += current.es01
        element[0].es02 += current.es02
        element[0].es03 += current.es03
      }
      return result
    },[])

    return assigned_projects.concat(sum_rows)
  }
  //   const sum_rows = issue_rows.reduce((result, current) => {
  //     let element = result.filter((p) => p.assigned_id === current.assigned_id)
  //     if (element.length === 0) {
  //       // 読み込んだチケットの担当者に紐付く集計レコードが存在しない場合
  //       // 集計レコードを新たに作成する
  //       const grade = group_users.filter(group_users => group_users.id === current.assigned_id)[0] ?
  //                       group_users.filter(group_users => group_users.id === current.assigned_id)[0].grade : ""
  //       const category = grade.substring(0,1) === 'G' || grade.substring(0,1) === 'M' ? 'プロパー' : 'BP'
  //       result.push({
  //         grade: grade,
  //         category: category,
  //         assigned_name: '<Link to={/issue_edit/${' + current.assigned_id + '}}>' + current.assigned_name + '</Link>',
  //         ...current
  //       })
  //     } else {
  //       // 読み込んだチケットの担当者に紐付く集計レコードが存在する場合
  //       // 既存の集計レコードに読み込んだチケットの見積工数を加算する
  //       element[0].es04 += current.es04
  //       element[0].es05 += current.es05
  //       element[0].es06 += current.es06
  //       element[0].es07 += current.es07
  //       element[0].es08 += current.es08
  //       element[0].es09 += current.es09
  //       element[0].es10 += current.es10
  //       element[0].es11 += current.es11
  //       element[0].es12 += current.es12
  //       element[0].es01 += current.es01
  //       element[0].es02 += current.es02
  //       element[0].es03 += current.es03
  //     }
  //     return result
  //   },[])
  //   return sum_rows
  // }

  const styles = {
    path: {
      margin: 12,
      fontSize: 12,
      color: "#9E9E9E",
    },
    hot: {
      margin: 12,
      fontSize: 12,
    }
  }

  //カラムヘッダー定義_要員別山積
  const colHeaders1 = ["#", "種別", "所属", "氏名",
    '4月' , '5月','6月', '7月', '8月', '9月',
    '10月', '11月', '12月', '1月', '2月', '3月']

  //カラムデータ定義_要員別山積
  const columns1 = [
    { data: 'assigned_id', editor: false, readOnly: true },
    { data: 'category', editor: false, readOnly: true },
    { data: 'grade', editor: false, readOnly: true },
    { data: 'assigned_name', editor: false, readOnly: true },
    { data: 'es04', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es05', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es06', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es07', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es08', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es09', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es10', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es11', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es12', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es01', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es02', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es03', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true }
  ]

  //カラムヘッダー定義_要員別集計
  const colHeaders2 = ["#", "氏名", "案件名",
    '4月' , '5月','6月', '7月', '8月', '9月',
    '10月', '11月', '12月', '1月', '2月', '3月']

  //カラムデータ定義_要員別集計
  const columns2 = [
    { data: 'assigned_id', editor: false, readOnly: true },
    { data: 'assigned_name', editor: false, readOnly: true },
    { data: 'title', editor: false, readOnly: true },
    { data: 'es04', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es05', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es06', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es07', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es08', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es09', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es10', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es11', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es12', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es01', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es02', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es03', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true }
  ]

  // const _onoffAssignedProjectList = (event, value) => {
  //   onoffAssignedProjectList()
  // }

  // const actions1 = [
  //   <FlatButton
  //     label="Back"
  //     secondary={true}
  //     onClick={(event, value) => _onoffAssignedProjectList(event, value)}
  //   />,
  // ]

  const onSelect = (r) => {
    setSelectedMember(rowData1(issue_rows, group_users)[r]['assigned_id'])
  }

  const hotTable1 = [
    <div style={styles.hot}>
      <HotTable
        root="hot"
        data={rowData1(issue_rows, group_users)}
        colHeaders={colHeaders1}
        columns={columns1}
        columnSorting={true}
        stretchH="all"
        manualColumnResize={true}
        afterSelectionEnd={onSelect}
        fillHandle={false}
      />
    </div>,
  ]

  const hotTable2 = [
    <div style={styles.hot}>
      <HotTable
        root="hot"
        data={rowData2(issue_rows, selected_member)}
        colHeaders={colHeaders2}
        columns={columns2}
        columnSorting={true}
        stretchH="all"
        manualColumnResize={true}
        fillHandle={false}
        mergeCells={[
          {row:0, col:0, rowspan:issue_rows.filter(issue_row => issue_row.assigned_id === selected_member).length, colspan:1},
          {row:0, col:1, rowspan:issue_rows.filter(issue_row => issue_row.assigned_id === selected_member).length, colspan:1}
        ]}
      />
    </div>,
  ]

  return(
    <MuiThemeProvider>
      <div>
        <div style={styles.path}><Link to={`/`}>Home</Link>> 要員別山積表</div>
          {hotTable2}
          {hotTable1}
      </div>
    </MuiThemeProvider>
  )
}

export default MemberList

// width="1000"

// <Dialog
//   title="AssignedProjectList"
//   actions={actions1}
//   modal={true}
//   open={assigned_projectlist_open}
//   autoScrollBodyContent={true}
//   children={hotTable}
// >
// </Dialog>
// <Link to={`/member/${selected_member}`}>
//   <FlatButton
//     label="AssignedProjectList"
//     primary={true}
//   />
// </Link>


// data={(issue_rows, group_users) => rowData(issue_rows, group_users)}


// <div style={styles.hot}>
//   <HotTable
//     floatingLabelText={<span style={{fontSize: 16}}>要員計画</span>}
//     root="hot"
//     data=""
//     colHeaders={colHeaders}
//     columns={columns}
//     columnSorting={true}
//     width="1000"
//     stretchH="all"
//     fixedColumnsLeft="3"
//     manualColumnResize={true}
//   />
// </div>
//

// <Table fixedHeader={true} >
//   <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
//     <TableRow>
//       <TableHeaderColumn style={{ width: '5%'}}>ID</TableHeaderColumn>
//       <TableHeaderColumn style={{ width: '15%'}}>案件管理番号</TableHeaderColumn>
//       <TableHeaderColumn style={{ width: '15%'}}>内部管理番号</TableHeaderColumn>
//       <TableHeaderColumn style={{ width: '25%'}}>案件名称</TableHeaderColumn>
//       <TableHeaderColumn style={{ width: '10%'}}>主担当</TableHeaderColumn>
//       <TableHeaderColumn style={{ width: '10%'}}>見積</TableHeaderColumn>
//       <TableHeaderColumn style={{ width: '10%'}}>詳細</TableHeaderColumn>
//       <TableHeaderColumn style={{ width: '10%'}}>表示</TableHeaderColumn>
//     </TableRow>
//   </TableHeader>
// </Table>