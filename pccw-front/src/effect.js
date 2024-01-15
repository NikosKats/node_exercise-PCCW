import { pipe, mergeAll } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export function effect(
  actionCreator,
  effectCreator,
  { additionalSuccessActions = () => [], additionalFailureActions = () => [] }
) {
  return pipe(
    mergeMap((data) =>
      effectCreator(data)
        .then((response) => {
          console.log('Effect response = ', response);
          return [
            actionCreator.succeeded(response, data),
            ...additionalSuccessActions(response, data)
          ];
        })
        .catch((error) => {
          console.log('Effect error = ', error);
          return [
            actionCreator.failed(error, data),
            ...additionalFailureActions(error, data)
          ];
        })
    ),
    mergeAll()
  );
}
