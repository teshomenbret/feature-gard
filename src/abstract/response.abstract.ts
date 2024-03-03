export interface ManyRecordsResponse<T> {
    success: boolean;
    metadata: {
      total: number;
    };
    data: T[];
  }
  
  export interface SingleRecordResponse<T> {
    success: boolean;
    result: T;
  }
  
  export namespace ResponseWrap {
    export function many<T>(data: T[]): ManyRecordsResponse<T> {
      return {
        success: true,
        metadata: {
          total: data.length,
        },
        data: data,
      };
    }
  
    export  function single<T>(data: T): SingleRecordResponse<T> {
      return {
        success: true,
        result: data,
      };
    }
  }
  