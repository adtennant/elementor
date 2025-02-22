import { Select, Button } from '@elementor/app-ui';

import './sort-select.scss';

export default function SortSelect( props ) {
	return (
		<div className="eps-sort-select">
			<div className="eps-sort-select__select-wrapper">
				<Select
					options={ props.options }
					value={ props.value.by }
					onChange={ ( e ) => {
						const value = e.target.value;
						props.onChangeSortValue?.( value );
						props.onChange( { by: value, direction: props.value.direction } );
					} }
					className="eps-sort-select__select"
					onClick={ () => {
						props.onChange( {
							by: props.value.by,
							direction: props.value.direction,
						} );
						props.onSortSelectOpen?.();
					} }
				/>
			</div>
			<Button
				text={ 'asc' === props.value.direction ? __( 'Sort Descending', 'elementor' ) : __( 'Sort Ascending', 'elementor' ) }
				hideText={ true }
				icon={ 'asc' === props.value.direction ? 'eicon-arrow-up' : 'eicon-arrow-down' }
				className="eps-sort-select__button"
				onClick={ () => {
					const direction = direction && 'asc' === props.value.direction ? 'desc' : 'asc';
					if ( props.onChangeSortDirection ) {
						props.onChangeSortDirection( direction );
					}
					props.onChange( {
						by: props.value.by,
						direction,
					} );
				} }
			/>
		</div>
	);
}

SortSelect.propTypes = {
	options: PropTypes.arrayOf( PropTypes.shape( {
		label: PropTypes.string.isRequired,
		value: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ).isRequired,
	} ) ).isRequired,
	value: PropTypes.shape( {
		direction: PropTypes.oneOf( [ 'asc', 'desc' ] ).isRequired,
		by: PropTypes.string.isRequired,
	} ).isRequired,
	onChange: PropTypes.func.isRequired,
	onChangeSortValue: PropTypes.func,
	onSortSelectOpen: PropTypes.func,
	onChangeSortDirection: PropTypes.func,
};
