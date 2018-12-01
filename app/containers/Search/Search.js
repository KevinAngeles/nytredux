import 'react-dates/initialize';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import isInclusivelyAfterDay from 'react-dates/src/utils/isInclusivelyAfterDay';
import { validateAndFetchArticles, setKeyword, setBeginDate, setEndDate, setBeginDateFocus, setEndDateFocus } from '../../actions/index';
import PropTypes from 'prop-types';

moment.locale('en');
const displayFormatDate = 'MM/DD/YYYY';
const today = moment().format(displayFormatDate); 

class Search extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div id="searchSection" className="row">
				<div className="page-header">
					<h2>Search</h2>
				</div>
				<div className="panel panel-primary">
					<div className="panel-heading">
						<h3 className="panel-title">Search articles on The New York Times</h3>
					</div>
					<form className="panel-body text-center">
						<div className="panel-form-group">
							<label htmlFor="topic">Topic</label>
							<input type="text" className="form-control" id="topic" placeholder="Topic" onInput={ e => this.props.setKeyword(e) } value={this.props.keyWord} />
              {this.props.inputErrors.keyWord.status ? <div className="alert alert-danger"><strong>Error!</strong> {this.props.inputErrors.keyWord.msg}</div>:""}
            </div>
						<div className="form-group">
							<label htmlFor="startYear">Start Year</label>
							<div>
								<SingleDatePicker
									id="startYear"
									date={this.props.beginDate} // momentPropTypes.momentObj or null
									onDateChange={ e => this.props.setBeginDate(e)} // PropTypes.func.isRequired
									focused={this.props.isBeginDateFocused} // PropTypes.bool
									onFocusChange={({ focused }) => this.props.setBeginDateFocus(focused)} // PropTypes.func.isRequired
									enableOutsideDays={false}
									isOutsideRange={day => isInclusivelyAfterDay(day, this.props.endDate)}
									readOnly={true}
									displayFormat={displayFormatDate}
									numberOfMonths={1}
									placeholder={today}
								/>
							</div>
              {this.props.inputErrors.beginDate.status ? <div className="alert alert-danger"><strong>Error!</strong> {this.props.inputErrors.beginDate.msg}</div>:""}
						</div>
						<div className="form-group">
							<label htmlFor="endYear">End Year</label>
							<div>	
								<SingleDatePicker
									id="endYear"
									date={this.props.endDate} // momentPropTypes.momentObj or null
									onDateChange={ e => this.props.setEndDate(e)} // PropTypes.func.isRequired
									focused={this.props.isEndDateFocused} // PropTypes.bool
									onFocusChange={({ focused }) => this.props.setEndDateFocus(focused)} // PropTypes.func.isRequired
									enableOutsideDays={false}
									isOutsideRange={ day => 
									 	!isInclusivelyAfterDay(day, this.props.beginDate) || isInclusivelyAfterDay(day, moment().add(1, 'days'))
									}
									readOnly={true}
									displayFormat={displayFormatDate}
									numberOfMonths={1}
									placeholder={today}
								/>
							</div>
              {this.props.inputErrors.endDate.status ? <div className="alert alert-danger"><strong>Error!</strong> {this.props.inputErrors.endDate.msg}</div>:""}
						</div>
						<button
              type="button"
              className="btn paper paper-raise"
              disabled={this.props.loading}
              onClick={ ev => { this.props.validateAndFetchArticles(this.props.keyWord,this.props.beginDate,this.props.endDate,this.props.savedArticles) }}>
              Search
            </button>
					</form>
				</div>
			</div>
		);
	}
}

Search.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    snippet: PropTypes.string.isRequired,
    alreadySaved: PropTypes.bool.isRequired,
    web_url: PropTypes.string.isRequired,
  })),
  savedArticles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  keyWord: PropTypes.string.isRequired,
  beginDate: PropTypes.object.isRequired,
  isBeginDateFocused: PropTypes.bool.isRequired,
  endDate: PropTypes.object.isRequired,
  isEndDateFocused: PropTypes.bool.isRequired,
  inputErrors: PropTypes.shape({
    keyWord: PropTypes.shape({
      msg: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
    }),
    beginDate: PropTypes.shape({
      msg: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
    }),
    endDate: PropTypes.shape({
      msg: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
    }),
  })
}

const mapStateToProps = state => ({
  articles: state.search.articles,
  savedArticles: state.saved.articles,
  loading: state.search.loadingArticles,
  keyWord: state.search.keyWord,
  beginDate: state.search.beginDate,
  isBeginDateFocused: state.search.isBeginDateFocused,
  endDate: state.search.endDate,
  isEndDateFocused: state.search.isEndDateFocused,
  inputErrors: state.search.inputErrors,
});

const mapDispatchToProps = {
  validateAndFetchArticles,
  setKeyword,
  setBeginDate,
  setEndDate,
  setBeginDateFocus,
  setEndDateFocus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);